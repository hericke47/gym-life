import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners'
import { Container } from './styles';

const CountDown = ({ initialTime }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      // Reduzir o tempo em 1 segundo
      setTime((prevTime) => {
        const newTime = prevTime - 1;

        // Evitar valores negativos
        return newTime >= 0 ? newTime : 0;
      });
    }, 1000); // Atualizar a cada 1000 milissegundos (1 segundo)

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(timerInterval);
  }, []); // O segundo argumento vazio faz com que o useEffect só seja executado uma vez, sem depender de props ou state

  // Formatar o tempo para exibição
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