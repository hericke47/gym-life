import React, { useEffect, useState } from 'react';
import { api } from '../../services/apiClient';
import {
  StyledTable,
  TableContainer,
  Td,
  Th
} from './styles'
import Pagination from '../Tables/Pagination';

export default function TableListCheckIns() {
  const [currentPage, setCurrentPage] = useState(1);
  const [checkIns, setCheckIns] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      const skip = (currentPage - 1) * itemsPerPage;
      const response = await api.get(`/users/checkIns`, {
        params: { skip, take: itemsPerPage },
      });

      setCheckIns(response.data.checkIns);
      setTotalItems(response.data.count);
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  const renderTable = () => {
    if (checkIns.length === 0) {
      return (
        <tbody>
          <tr>
            <Td colSpan={3}>Nenhum check-in encontrado.</Td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {checkIns.map(item => (
          <tr key={item.id}>
            <Td>{item.gym.name}</Td>
            <Td>{item.gym.phone}</Td>
            <Td>{item.approved ? '✓' : 'X'}</Td>
          </tr>
        ))}
      </tbody>
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <Th>Nome</Th>
            <Th>Telefone</Th>
            <Th>Aprovado</Th>
          </tr>
        </thead>
        {renderTable()}
      </StyledTable>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalItems / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </TableContainer>
  );
};