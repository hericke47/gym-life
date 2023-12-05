import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #FFFFFF;
  border: 1px solid #D3E2E5;
  border-radius: 20px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  button {
    font-size: 14px;
  }
`;

export const LogoSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 24px;
    border-radius: 16px;
  }
`

export const ContentSection = styled.section`
  h3 {
    margin-top: 12px;
  }

  p {
    margin-top: 12px;
    font-size: 12px;
  }
`