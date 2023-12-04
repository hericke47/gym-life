import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../components/Form/Button';
import { Input } from '../components/Form/Input';
import { api } from '../services/apiClient';

import { AnimationContainer, Container, Background, Content } from '../styles/pages/criar-conta';
import { whithSSRGuest } from '../utils/whithSSRGuest';

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
      console.log(data)
      await api.post('/users', {
        name: data.name,
        email: data.email,
        password: data.password
      })

      toast('Conta criada com sucesso', {
        position: "top-right",
        type: 'success',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      router.push('/')
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
              {...register('name')}
            />

            <Input
              name="email"
              type="email"
              placeholder="E-Mail"
              {...register('email')}
            />

            <Input
              name="password"
              type="password"
              placeholder="Senha"
              {...register('password')}
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

export const getServerSideProps = whithSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})