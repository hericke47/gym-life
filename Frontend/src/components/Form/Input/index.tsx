import React, { ChangeEventHandler } from 'react';
import { Container } from './styles';
import { UseFormRegister } from 'react-hook-form';

type InputProps = {
  name: string
  register?: UseFormRegister<any>
  required?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  placeholder: string
  type: string
}

export function Input ({ name, register, required, placeholder, type, onChange }: InputProps){
  return (
    <Container>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        {...(register ? register(name, { required }) : {})}
      />
    </Container>
  );
};