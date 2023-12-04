import { whithSSRAuth } from "../utils/whithSSRAuth";

export default function Login() {
  return (
    <h1>asdasd</h1>
  )
}


export const getServerSideProps = whithSSRAuth(async ctx => {
  return {
    props: {}
  }
})
