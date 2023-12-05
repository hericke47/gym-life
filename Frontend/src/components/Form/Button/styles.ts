import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  disabled: boolean;
}

export const Container = styled.button<ContainerProps>`
  background: ${({ theme }) => theme.colors.primary};
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #fff;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#EC5E4F')};
  }

  ${props => props.disabled && css`
    background: ${shade(0.2, '#E5E5E5')};
    color: #E5E5E5;
    &:hover {
      background: ${shade(0.2, '#E5E5E5')};
    }
    cursor: auto;
  `}
`;