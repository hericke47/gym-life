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

  @media only screen and (max-device-width: 1200px) {
    width: 100%;
    top: 0;
    height: auto;
    flex-direction: row;
    padding: 24px 12px;

    a, button {
      flex-direction: row;
    }
  }
`;

export const Options = styled.section`
  @media only screen and (max-device-width: 1200px) {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
  }
`

export const ContainerOptions = styled.div`
  img {
    margin-bottom: 24px;
  }

  @media only screen and (max-device-width: 1200px) {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;

    img {
      margin-bottom: 0;
      margin-right: 24px;
    }
  }
`