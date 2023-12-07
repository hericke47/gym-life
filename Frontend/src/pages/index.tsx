import { useContext } from "react"
import { Input } from "../components/Form/Input";
import Button from "../components/Form/Button";
import { useForm } from 'react-hook-form';
import { useRouter } from "next/dist/client/router";

import { AuthContext } from "../contexts/AuthContext";
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';

import { Container,
  Content,
  AnimationContainer,
  Background
} from '../styles/pages/login';
import { withSSRGuest } from "../utils/withSSRGuest";

interface ILoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const { signIn, userLatitude, userLongitude } = useContext(AuthContext)
  const router = useRouter();

  const { register, handleSubmit, formState: {isSubmitting} } = useForm();

  async function handleLogin(data: ILoginFormData) {
    try {
      await signIn({
        email: data.email,
        password: data.password
      })

      if(userLatitude && userLongitude) {
        toast('Login feito com sucesso', {
          position: "top-right",
          type: 'success',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          onClose: () => {
            router.push('/dashboard')
          }
        });
      }
    } catch(err) {
      toast('Erro ao efetuar login', {
        position: "top-right",
        type: 'error',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(handleLogin)}>
            <h1>Faça seu login
            na plataforma</h1>

            <Input
              required
              register={register}
              name="email"
              type="email"
              placeholder="E-Mail"
            />

            <Input
              required
              register={register}
              name="password"
              type="password"
              placeholder="Senha"
            />

            <Button type="submit" loading={isSubmitting}>Entrar</Button>
          </form>


          <Link href="/criar-conta">
            Criar Conta
          </Link>
        </AnimationContainer>
      </Content>
      <ToastContainer />
      <Background />
    </Container>
  )
}


export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})