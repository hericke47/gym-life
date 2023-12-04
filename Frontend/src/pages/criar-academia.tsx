import { whithSSRAuth } from "../utils/whithSSRAuth";

export default function Login() {
  return (
    <div>
      <h1>asdasd</h1>
    </div>
  )
}


export const getServerSideProps = whithSSRAuth(async ctx => {
  return {
    props: {}
  }
})
