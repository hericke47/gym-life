import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;

  main {
    flex: 1;

    form {
      width: 900px;
      margin: 64px auto;

      background: #FFFFFF;
      border: 1px solid #D3E2E5;
      border-radius: 20px;

      padding: 64px 40px;

      overflow: hidden;

      fieldset + fieldset {
        margin-top: 42px;
      }

      fieldset {
        border: 0;

        legend {
          width: 100%;

          font-size: 32px;
          line-height: 34px;
          font-weight: 700;

          border-bottom: 1px solid #D3E2E5;
          margin-bottom: 40px;
          padding-bottom: 24px;
        }
      }
    }
  }

  @media only screen and (max-device-width: 1200px) {
    margin-top: 42px;
  }
`;
