import React from 'react';

import { Container, LogoSection, ContentSection } from './styles';
import { IGym } from '../../pages/dashboard';
import Button from '../Form/Button';
import { api } from '../../services/apiClient';
import { toast } from 'react-toastify';

type GymCardProps = {
  gym: IGym
  userLatitude: number
  userLongitude: number
}

export default function GymCard({gym, userLatitude, userLongitude}: GymCardProps) {
  async function handleCheckIn(gymId: string, userLatitude: number, userLongitude: number) {
    try {
      await api.post(`/gyms/checkIn`, {
        gymId: gymId,
        latitude: userLatitude,
        longitude: userLongitude
      })

      toast('check-in realizado, aguardando aprovação', {
        position: "top-right",
        type: 'success',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch(err) {
      toast('Erro ao realizar check-in', {
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
      <LogoSection>
        <img src="https://play-lh.googleusercontent.com/eYpDhWypRwEmmSL7GPMiilwQEVEj2HISsUW_OflkCLUsdOHz5U9e3ePRu2flVuVKvaI" alt="Gympass" />
        <p>{gym.distance} km</p>
      </LogoSection>
      <ContentSection>
        <h3>{gym.name}</h3>

        <p>{gym.address.road}, {gym.address.suburb}, {gym.address.city}, {gym.address.state}, {gym.address.postcode}</p>
      </ContentSection>
      <Button
        disabled={Number(gym.distance) > 0.10 ? true : false}
        onClick={() => handleCheckIn(gym.id, userLatitude, userLongitude)}
      >
        {Number(gym.distance) > 0.10 ? "Check-in" : "Check-in"}
      </Button>
    </Container>
  )
};