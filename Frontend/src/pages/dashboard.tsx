import { useEffect, useState } from "react";
import SideBar from "../components/Sidebar/SideBar";
import { Card, Container, NotFoundGyms } from "../styles/pages/dashboard";
import { whithSSRAuth } from "../utils/whithSSRAuth";
import { api } from "../services/apiClient";
import axios from "axios";
import GymCard from "../components/GymCard";
import { calculateDistance } from "../utils/calculateDistance";
import { ToastContainer } from "react-toastify";
import { ClipLoader } from 'react-spinners'

export interface IGym {
  id: string;
  name: string;
  description: string;
  phone: string;
  latitude: string;
  longitude: string;
  active: string;
  address: {
    road: string;
    suburb: string;
    city: string;
    state: string
    postcode: string;
  };
  distance: number;
}

export interface ICheckIns {
  id: string;
  userId: string;
  gymId: string;
  createdAt: string;
  updatedAt: string;
  approved: boolean;
}

export default function Login() {
  const [nearbyGyms, setNearbyGyms] = useState<IGym[]>([])
  const [userLatitude, setUserLatitude] = useState(0);
  const [userLongitude, setUserLongitude] = useState(0);
  const [userCheckInsToday, setUserCheckInsToday] = useState<ICheckIns[]>([])
  const [loading, setLoading] = useState(true)

  async function getUserCheckInsToday() {
    await api.get(`/users/checkIns?onlyToday=true`).then(response => setUserCheckInsToday(response.data.checkIns))
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(location => {
      const userLatitude = location.coords.latitude
      const userLongitude = location.coords.longitude

      setUserLatitude(userLatitude)
      setUserLongitude(userLongitude)

      if(userLatitude && userLongitude) {
        api.get(`/gyms?latitude=${userLatitude}&longitude=${userLongitude}`).then(async response => {
          const filteredData = await Promise.all(
            response.data.map(async g => {
              const result = await axios.get(`https://geocode.maps.co/reverse?lat=${g.latitude}&lon=${g.longitude}`).then(response => response.data)
              return {
                ...g,
                address: result.address,
                distance: calculateDistance(g.latitude, g.longitude,userLatitude, userLongitude).toFixed(2)
              }
            })
          )
          const orderedGymsByDistance = filteredData.sort((a, b) => a.distance - b.distance)

          setNearbyGyms(orderedGymsByDistance)
          getUserCheckInsToday()
          setLoading(false)
        })
      }
    })
  }, [])

  return (
    <Container>
      <SideBar />

      <Card>
        <header>
          <h1>Academias próximas</h1>
          <p>Check-ins realizados hoje: {userCheckInsToday.length}/2</p>
        </header>

        <div className="gymCardsContainer">
          {nearbyGyms.length > 1 && nearbyGyms.map(gym => (
            <GymCard
              key={gym.id}
              gym={gym}
              userLatitude={userLatitude}
              userLongitude={userLongitude}
              checkIns={userCheckInsToday.filter(checkIn => gym.id === checkIn.gymId)}
              setCheckIn={setUserCheckInsToday}
            />
          ))}
        </div>

        {nearbyGyms.length <= 0 && (
          <NotFoundGyms>
            {loading ? (
              <ClipLoader size={24} color='#6f7284' />
            ): (
              <h2>Nenhuma academia próxima encontrada</h2>
            )}
          </NotFoundGyms>
        )}
      </Card>
      <ToastContainer />
    </Container>
  )
}


export const getServerSideProps = whithSSRAuth(async ctx => {
  return {
    props: {}
  }
})
