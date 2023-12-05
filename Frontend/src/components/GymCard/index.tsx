import React from 'react';

import { Container, LogoSection, ContentSection } from './styles';
import { IGym } from '../../pages/dashboard';
import Button from '../Form/Button';

const GymCard = (data: IGym) => (
  <Container>
    <LogoSection>
      <img src="https://play-lh.googleusercontent.com/eYpDhWypRwEmmSL7GPMiilwQEVEj2HISsUW_OflkCLUsdOHz5U9e3ePRu2flVuVKvaI" alt="Gympass" />
      <p>{data.distance} km</p>
    </LogoSection>
    <ContentSection>
      <h3>{data.name}</h3>

      <p>{data.address.road}, {data.address.suburb}, {data.address.city}, {data.address.state}, {data.address.postcode}</p>
    </ContentSection>
      <Button
        disabled={Number(data.distance) > 0.10 ? true : false}
        onClick={() => console.log('a')}
      >
          {Number(data.distance) > 0.1 ? "Check-in" : "Check-in"}
      </Button>
  </Container>
);

export default GymCard;