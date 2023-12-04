import React, { InputHTMLAttributes } from 'react';
import { Container } from './styles';

export function Input ({ ...rest }: InputHTMLAttributes<HTMLInputElement>){
  return (
    <Container>
      <input
        {...rest}
      />
    </Container>
  );
};