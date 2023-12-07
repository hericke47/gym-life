import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../components/Form/Button';
import { Input } from '../components/Form/Input';
import { api } from '../services/apiClient';

import { AnimationContainer, Container, Background, Content } from '../styles/pages/criar-conta';
import { withSSRGuest } from '../utils/withSSRGuest';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export default function CriarConta() {
  const { register, handleSubmit, formState } = useForm();

  const router = useRouter();

  async function handleCreateUser(data: SignUpFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        email: data.email,
        password: data.password
      })

      toast('Conta criada com sucesso', {
        position: "top-right",
        type: 'success',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        onClose: () => {
          router.push('/')
        }
      });
    } catch(err) {
      toast('Erro ao fazer cadastro de usuário', {
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
      <Background />
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(handleCreateUser)}>
            <h1>Faça seu Cadastro</h1>

            <Input
              name="name"
              placeholder="Nome"
              required
              type="text"
              register={register}
            />

            <Input
              name="email"
              type="email"
              placeholder="E-Mail"
              register={register}
              required
            />

            <Input
              name="password"
              type="password"
              placeholder="Senha"
              register={register}
              required
            />

            <Button type="submit" loading={formState.isSubmitting}>Cadastrar</Button>
          </form>

          <Link href="/">
            Voltar para o Login
          </Link>
        </AnimationContainer>
        <ToastContainer />
      </Content>
    </Container>
  );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})