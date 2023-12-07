import { useContext, useEffect, useState } from "react";
import SideBar from "../components/Sidebar/SideBar";
import { Card, Container, NotFoundGyms } from "../styles/pages/academias";
import { withSSRAuth } from "../utils/withSSRAuth";
import { api } from "../services/apiClient";
import axios from "axios";
import GymCard from "../components/GymCard";
import { calculateDistance } from "../utils/calculateDistance";
import { ToastContainer } from "react-toastify";
import { ClipLoader } from 'react-spinners'
import Pagination from "../components/Tables/Pagination";
import { Input } from "../components/Form/Input";
import { AuthContext } from "../contexts/AuthContext";

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

export default function Academias() {
  const [gyms, setGyms] = useState<IGym[]>([])
  const [userCheckInsToday, setUserCheckInsToday] = useState<ICheckIns[]>([])
  const [loading, setLoading] = useState(true)
  const [input, setInput] = useState('')

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 9;
  const { userLatitude, userLongitude } = useContext(AuthContext)

  async function getUserCheckInsToday() {
    await api.get(`/users/todayCheckIn`).then(response => setUserCheckInsToday(response.data))
  }

  useEffect(() => {
    const skip = (currentPage - 1) * itemsPerPage;

    api.get(`/gyms/search?name=${input}`, {
      params: { skip, take: itemsPerPage },
    }).then(async response => {
      const filteredData = await Promise.all(
        response.data.gyms.map(async g => {
          const result = await axios.get(`https://geocode.maps.co/reverse?lat=${g.latitude}&lon=${g.longitude}`).then(response => response.data)
          return {
            ...g,
            address: result.address,
            distance: calculateDistance(g.latitude, g.longitude,userLatitude, userLongitude).toFixed(2)
          }
        })
      )

      setTotalItems(response.data.count);
      setGyms(filteredData)
      getUserCheckInsToday()
      setLoading(false)
    })
  }, [input, currentPage, itemsPerPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <SideBar />

      <Card>
        <header>
          <h1>Buscar academias</h1>
          <Input
            onChange={e => setInput(e.target.value)}
            placeholder="Buscar"
            type="text"
            name="search"
          />
        </header>

        <div className="gymCardsContainer">
          {gyms.length > 1 && gyms.map(gym => (
            <GymCard
              key={gym.id}
              gym={gym}
              userLatitude={userLatitude}
              userLongitude={userLongitude}
              gymCheckIn={userCheckInsToday.find(checkIn => gym.id === checkIn.gymId)}
              checkIns={userCheckInsToday}
              setCheckIn={setUserCheckInsToday}
            />
          ))}
        </div>

        {gyms.length <= 0 && (
          <NotFoundGyms>
            {loading ? (
              <ClipLoader size={24} color='#6f7284' />
            ): (
              <h2>Nenhuma academia encontrada</h2>
            )}
          </NotFoundGyms>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalItems / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </Card>
      <ToastContainer />
    </Container>
  )
}


export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  }
})
