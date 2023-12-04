import { useContext } from "react"
import { Input } from "../components/Form/Input";
import Button from "../components/Form/Button";
import { useForm } from 'react-hook-form';
import Router from "next/dist/client/router";

import { AuthContext } from "../contexts/AuthContext";
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';

import { Container,
  Content,
  AnimationContainer,
  Background
} from '../styles/pages/login';
import { whithSSRGuest } from "../utils/whithSSRGuest";

interface ILoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const { signIn } = useContext(AuthContext)

  const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm();

  async function handleLogin(data: ILoginFormData) {
    try {
      await signIn({
        email: data.email,
        password: data.password
      })

      toast('Login feito com sucesso', {
        position: "top-right",
        type: 'success',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      Router.push('/dashboard');
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


export const getServerSideProps = whithSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})