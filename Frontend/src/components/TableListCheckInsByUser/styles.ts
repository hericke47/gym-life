import styled from 'styled-components';

export const TableContainer = styled.div`
  margin-top: 20px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

export const Th = styled.th`
  padding: 8px;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  text-align: left;
`;

export const Td = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
`;

export const NotFoundCheckIns = styled.tr`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  h2 {
    font-weight: 500;
    text-align: center;
    color: #6f7284;
  }
`