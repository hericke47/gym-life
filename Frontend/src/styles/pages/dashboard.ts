import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;

  @media only screen and (max-device-width: 1200px) {
    margin-top: 42px;
  }
`;

export const Card = styled.div`
  width: 900px;
  margin: 64px auto;

  background: #FFFFFF;
  border: 1px solid #D3E2E5;
  border-radius: 20px;

  padding: 64px 40px;
  overflow: hidden;

  h1 {
    width: 100%;
    font-size: 32px;
    line-height: 34px;
    font-weight: 700;

    border-bottom: 1px solid #D3E2E5;
    margin-bottom: 40px;
    padding-bottom: 24px;
  }

  .gymCardsContainer {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;

    @media only screen and (max-device-width: 900px) {
      display: flex;
      flex-direction: column;
    }
  }
`

export const NotFoundGyms = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    font-weight: 500;
    text-align: center;
    color: #6f7284;
  }
`