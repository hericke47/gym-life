import { useContext } from "react";
import SideBar from "../components/Sidebar/SideBar";
import TableListCheckInsByUser from "../components/TableListCheckInsByUser";
import { AuthContext } from "../contexts/AuthContext";
import { Card, Container } from "../styles/pages/check-ins-usuario";
import { withSSRAuth } from "../utils/withSSRAuth";
import { ToastContainer } from "react-toastify";

export default function UserCheckIns() {
  const { user, userAddress } = useContext(AuthContext)

  return (
    <Container>
      <SideBar />

      <Card>
        <header>
          <h1>{user?.name}</h1>
          <p>Email: {user?.email}</p>
          <p>Endereço:
           {userAddress?.road && ` ${userAddress?.road},`}
           {userAddress?.suburb && ` ${userAddress?.suburb},`}
           {userAddress?.city && ` ${userAddress?.city},`}
           {userAddress?.state && ` ${userAddress?.state},`}
           {userAddress?.postcode && ` ${userAddress?.postcode}`}
          </p>
        </header>
        <TableListCheckInsByUser />
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
