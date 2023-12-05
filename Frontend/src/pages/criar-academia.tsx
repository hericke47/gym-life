import { useForm } from "react-hook-form";
import SideBar from "../components/Sidebar/SideBar";
import { Container } from "../styles/pages/criar-academia";
import { whithSSRAuth } from "../utils/whithSSRAuth";
import { Input } from "../components/Form/Input";
import { toast, ToastContainer } from 'react-toastify';
import { api } from "../services/apiClient";
import Button from "../components/Form/Button";
import axios from "axios";

interface CreateGymFormData {
  name: string;
  description: string;
  phone: string;
  address: string;
}

export default function CreateGym() {
  const { register, handleSubmit, formState: {isSubmitting}, reset } = useForm();

  async function handleCreateGym(data: CreateGymFormData) {
    try {
      axios.get(`https://geocode.maps.co/search?q=${data.address}`).then(async response => {
        if(response.data[0]) {
          await api.post('/gyms', {
            name: data.name,
            description: data.description,
            phone: data.phone,
            latitude: response.data[0].lat,
            longitude: response.data[0].lon
          })

          toast('Academia criada com sucesso', {
            position: "top-right",
            type: 'success',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          reset()
        }

        toast('Endereço não encontrado', {
          position: "top-right",
          type: 'error',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
    } catch(err) {
      toast('Erro ao fazer cadastro de academia', {
        position: "top-right",
        type: 'error',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      reset()
    }
  }

  return (
    <Container>
      <SideBar />
      <main>
        <form onSubmit={handleSubmit(handleCreateGym)}>
          <fieldset>
            <legend>Dados da academia</legend>

            <Input
              name="name"
              placeholder="Nome"
              required
              type="text"
              register={register}
            />

            <Input
              name="description"
              placeholder="Descrição"
              type="text"
              required
              register={register}
            />

            <Input
              name="phone"
              type="text"
              required
              placeholder="Telefone"
              register={register}
            />
          </fieldset>

          <fieldset>
            <legend>Localização</legend>

            <Input
              name="address"
              placeholder="Endereço"
              type="text"
              required
              register={register}
            />

          </fieldset>
          <Button type="submit" loading={isSubmitting}>Cadastrar</Button>
        </form>
      </main>
      <ToastContainer />
    </Container>
  )
}


export const getServerSideProps = whithSSRAuth(async ctx => {
  return {
    props: {}
  }
})
