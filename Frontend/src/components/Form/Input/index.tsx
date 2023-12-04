import React from 'react';
import { Container } from './styles';
import { UseFormRegister } from 'react-hook-form';

type InputProps = {
  name: string
  register: UseFormRegister<any>
  required: boolean
  placeholder: string
  type: string
}

export function Input ({ name, register, required, placeholder, type }: InputProps){
  return (
    <Container>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { required })}
      />
    </Container>
  );
};