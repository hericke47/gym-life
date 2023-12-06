import SideBar from "../components/Sidebar/SideBar";
import TableListCheckInsByUser from "../components/TableListCheckInsByUser";
import { Card, Container } from "../styles/pages/check-ins-usuario";
import { whithSSRAuth } from "../utils/whithSSRAuth";
import { ToastContainer } from "react-toastify";

export default function CheckIns() {
  return (
    <Container>
      <SideBar />

      <Card>
        <header>
          <h1>Seus Check-ins</h1>
        </header>
        <TableListCheckInsByUser />
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
