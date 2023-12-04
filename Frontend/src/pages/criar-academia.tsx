import { useForm } from "react-hook-form";
import SideBar from "../components/Sidebar/SideBar";
import { Container } from "../styles/pages/criar-academia";
import { whithSSRAuth } from "../utils/whithSSRAuth";
import { Input } from "../components/Form/Input";
import { toast, ToastContainer } from 'react-toastify';
import { api } from "../services/apiClient";
import Button from "../components/Form/Button";

interface CreateGymFormData {
  name: string;
  description: string;
  phone: string;
  latitude: number;
  longitude: number;
}

export default function CreateGym() {
  const { register, handleSubmit, formState: {isSubmitting}, reset } = useForm();

  async function handleCreateGym(data: CreateGymFormData) {
    try {
      await api.post('/gyms', {
        name: data.name,
        description: data.description,
        phone: data.phone,
        latitude: data.latitude,
        longitude: data.longitude
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

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(location => {
  //     console.log(location.coords)
  //   })
  // }, [])

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
            {/* Aqui eu usaria a api do google com o pacote "react-geocode" para fazer geocode para buscar pelo endereço a latitude e longitude, mas por gerar uma chave e ter custo envolvido irei usar apenas inputs */}
            <Input
              name="latitude"
              placeholder="Latitude"
              type="number"
              required
              register={register}
            />

            <Input
              name="longitude"
              type="number"
              required
              placeholder="Longitude"
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
