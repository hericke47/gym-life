import styled, { css } from 'styled-components';

export const AppSidebar = styled.div`
  position: fixed;
  height: 100%;
  padding: 32px 24px;
  background: linear-gradient(329.54deg, #F17062 0%, #EC5E4F 100%);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  img {
    width: 48px;
    border-radius: 16px;
    cursor: pointer;
  }

  a, button {
    width: 48px;
    height: 48px;

    border: 0;

    background: #EC5E4F;
    border-radius: 16px;

    cursor: pointer;

    transition: background-color 0.2s;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  button:hover {
    background: #F17062;
  }
`;

export const Options = styled.section`

`

export const ContainerOptions = styled.div`
  img {
    margin-bottom: 24px;
  }

`