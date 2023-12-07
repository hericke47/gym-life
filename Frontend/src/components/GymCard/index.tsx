import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Container, LogoSection, ContentSection } from './styles';
import { ICheckIns, IGym } from '../../pages/dashboard';
import Button from '../Form/Button';
import { api } from '../../services/apiClient';
import { toast } from 'react-toastify';
import CountdownTimer from '../CountDown';

type GymCardProps = {
  gym: IGym
  userLatitude: number
  userLongitude: number
  gymCheckIn: ICheckIns
  checkIns: ICheckIns[]
  setCheckIn: Dispatch<SetStateAction<ICheckIns[]>>
}

export default function GymCard({gym, userLatitude, userLongitude, checkIns, setCheckIn, gymCheckIn}: GymCardProps) {
  const [intervalInSeconds, setIntervalInSeconds] = useState(0);

  const fetchCheckInsToday = () => {
    api.get(`/users/todayCheckIn`).then(response => setCheckIn(response.data))
  }

  useEffect(() => {
    const actualDate = new Date();
    const lastCheckInData = new Date(gymCheckIn?.createdAt)
    const milisecondsInterval = Math.abs(actualDate.getTime() - lastCheckInData.getTime())
    const secondsInterval = Math.floor(milisecondsInterval / 1000) - 1200

    setIntervalInSeconds(secondsInterval)

    if(gymCheckIn?.approved) {
      setIntervalInSeconds(0)
    }
  }, [checkIns])

  useEffect(() => {
    if(intervalInSeconds < 0 && checkIns.length >= 1) {
      const intervalId = setInterval(fetchCheckInsToday, 60 * 1000);

      return () => clearInterval(intervalId);
    }
  }, [fetchCheckInsToday])

  async function handleCheckIn(gymId: string, userLatitude: number, userLongitude: number) {
    try {
      await api.post(`/gyms/checkIn`, {
        gymId: gymId,
        latitude: userLatitude,
        longitude: userLongitude
      }).then(() => {
        setIntervalInSeconds(0)
        fetchCheckInsToday()
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

        <p>
          {gym.address?.road && ` ${gym.address?.road},`}
          {gym.address?.suburb && ` ${gym.address?.suburb},`}
          {gym.address?.city && ` ${gym.address?.city},`}
          {gym.address?.state && ` ${gym.address?.state},`}
          {gym.address?.postcode && ` ${gym.address?.postcode}`}
        </p>
      </ContentSection>

      <Button
        disabled={(Number(gym.distance) > 0.10 || checkIns.length >= 1 || intervalInSeconds < 0) ? true : false}
        onClick={() => handleCheckIn(gym.id, userLatitude, userLongitude)}
      >
        {(intervalInSeconds < 0 && !gymCheckIn?.approved) ?
          <CountdownTimer initialTime={Math.abs(intervalInSeconds)} /> :
          Number(gym.distance) > 0.10 ?
          "Check-in" :
          "Check-in"}
      </Button>
    </Container>
  )
};