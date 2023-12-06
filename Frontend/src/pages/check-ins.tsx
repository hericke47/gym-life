import SideBar from "../components/Sidebar/SideBar";
import TableListCheckIns from "../components/TableListCheckIns";
import { Card, Container } from "../styles/pages/check-ins";
import { withSSRAuth } from "../utils/withSSRAuth";
import { ToastContainer } from "react-toastify";

export default function CheckIns() {
  return (
    <Container>
      <SideBar />

      <Card>
        <header>
          <h1>Check-ins</h1>
        </header>
        <TableListCheckIns />
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
