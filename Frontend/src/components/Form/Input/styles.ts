import styled, { css } from 'styled-components';

export const Container = styled.div`
  background: #fafafc;
  border-radius: 10px;

  border: 2px solid #e6e6f0;
  color: #6a6180;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  input {
    padding: 16px;
    width: 100%;
    flex: 1;
    background: transparent;
    border: 0;
    color: #6a6180;
    &::placeholder {
      color: #9c98a6;
    }
  }

  input:focus {
    color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 10px;

    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  svg {
    margin-right: 16px;
  }
`;
