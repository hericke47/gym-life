import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  disabled?: boolean
};

const Button: React.FC<ButtonProps> = ({ children, loading, disabled, ...rest }) => (
  <Container disabled={disabled} type="button" {...rest}>
    {loading ? 'Carregando...' : children}
  </Container>
);

export default Button;