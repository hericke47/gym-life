import styled from 'styled-components';

interface PaginationProps {
  active: boolean;
}

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const PaginationLink = styled.a<PaginationProps>`
  margin: 0 5px;
  padding: 5px 10px;
  text-decoration: none;
  color: ${({ active }) => (active ? 'white' : 'black')};
  background-color: ${({ active, theme }) => (active ? theme.colors.primary : 'white')};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  -webkit-touch-callout: none;  /* iPhone OS, Safari */
  -webkit-user-select: none;    /* Chrome, Safari 3 */
  -khtml-user-select: none;     /* Safari 2 */
  -moz-user-select: none;       /* Firefox */
  -ms-user-select: none;        /* IE10+ */
  user-select: none;
`;