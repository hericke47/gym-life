import React, { useEffect, useState } from 'react';
import { api } from '../../services/apiClient';
import {
  StyledTable,
  TableContainer,
  Td,
  Th
} from './styles'
import Pagination from '../Tables/Pagination';
import { format } from 'date-fns';
import { FaCheck } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

interface ICheckIn {
  id: string,
  userId: string,
  gymId: string,
  createdAt: string,
  updatedAt: string,
  approved: boolean,
  gym: {
    id: string,
    name: string,
    description: string,
    phone: string,
    latitude: number,
    longitude: number,
    createdAt: string,
    updatedAt: string,
    active: boolean
  }
}

export default function TableListCheckInsByUser() {
  const [currentPage, setCurrentPage] = useState(1);
  const [checkIns, setCheckIns] = useState<ICheckIn[]>([]);
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
            <Td colSpan={7}>Nenhum check-in encontrado.</Td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {checkIns.map(item => (
          <tr key={item.id}>
            <Td>{item.gym.name}</Td>
            <Td>{item.gym.description}</Td>
            <Td>{item.gym.phone}</Td>
            <Td>{item.approved ? <FaCheck /> : <FiX strokeWidth={5} />}</Td>
            <Td>{format(new Date(item.createdAt), 'dd/MM/yyyy HH:mm:ss')}</Td>
          </tr>
        ))}
      </tbody>
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <Th>Academia</Th>
              <Th>Descrição</Th>
              <Th>Telefone</Th>
              <Th>Aprovado</Th>
              <Th>Data</Th>
            </tr>
          </thead>
          {renderTable()}
        </StyledTable>
      </TableContainer>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalItems / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </>
  );
};