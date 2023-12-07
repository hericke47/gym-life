import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners'
import { Container } from './styles';

const CountDown = ({ initialTime }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime - 1;


        return newTime >= 0 ? newTime : 0;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);


  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Container>
      <ClipLoader size={12} color='#fff' />
      <p>{formatTime()}</p>
    </Container>
  );
};

export default CountDown;