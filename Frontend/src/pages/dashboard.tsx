import { useEffect, useState } from "react";
import SideBar from "../components/Sidebar/SideBar";
import { Card, Container } from "../styles/pages/dashboard";
import { whithSSRAuth } from "../utils/whithSSRAuth";
import { api } from "../services/apiClient";
import axios from "axios";
import GymCard from "../components/GymCard";
import { calculateDistance } from "../utils/calculateDistance";


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

export default function Login() {
  const [nearbyGyms, setNearbyGyms] = useState<IGym[]>([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(location => {
      console.log(location.coords.latitude, location.coords.longitude)
      if(location.coords.latitude && location.coords.longitude) {
        api.get(`/gyms?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`).then(async response => {
          const filteredData = await Promise.all(
            response.data.map(async g => {
              const result = await axios.get(`https://geocode.maps.co/reverse?lat=${g.latitude}&lon=${g.longitude}`).then(response => response.data)
              return {
                ...g,
                address: result.address,
                distance: calculateDistance(g.latitude, g.longitude,location.coords.latitude, location.coords.longitude).toFixed(2)
              }
            })
          )
          const orderedGymsByDistance = filteredData.sort((a, b) => a.distance - b.distance)

          setNearbyGyms(orderedGymsByDistance)
        })
      }
    })
  }, [])

  return (
    <Container>
      <SideBar />

      <Card>
        <h1>Academias próximas</h1>

        <div className="gymCardsContainer">
          {nearbyGyms.length >= 1 && nearbyGyms.map(gym => (
            <GymCard {...gym} />
          ))}
        </div>
      </Card>
    </Container>
  )
}


export const getServerSideProps = whithSSRAuth(async ctx => {
  return {
    props: {}
  }
})
