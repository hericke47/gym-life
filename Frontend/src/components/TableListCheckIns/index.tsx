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
import Button from '../Form/Button';
import { FaCheck } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { toast } from 'react-toastify';

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
  },
  user: {
    name: string
  }
}

export default function TableListCheckIns() {
  const [currentPage, setCurrentPage] = useState(1);
  const [checkIns, setCheckIns] = useState<ICheckIn[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      const skip = (currentPage - 1) * itemsPerPage;
      const response = await api.get(`/gyms/checkIns`, {
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

  async function handleApproveCheckIn(checkInId: string) {
    try {
      await api.patch(`/gyms/checkIn/${checkInId}`)

      const filteredCheckIns = checkIns.filter(c => {
        if(c.id === checkInId) {
          c.approved = true

          return c
        }

        return c
      })

      setCheckIns(filteredCheckIns)

      toast('Check-in aprovado', {
        position: "top-right",
        type: 'success',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch(err) {
      toast('Erro ao aprovar check-in', {
        position: "top-right",
        type: 'success',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  function checkIntervalCheckIn(checkIn: ICheckIn): boolean {
    const actualDate = new Date();
    const lastCheckInData = new Date(checkIn.createdAt)
    const milisecondsInterval = Math.abs(actualDate.getTime() - lastCheckInData.getTime())
    const secondsInterval = Math.floor(milisecondsInterval / 1000)

    if(secondsInterval > 1200) {
      return true
    }

    return false
  }

    return (
      <tbody>
        {checkIns.map(checkIn => (
          <tr key={checkIn.id}>
            <Td>{checkIn.user.name}</Td>
            <Td>{checkIn.gym.name}</Td>
            <Td>{checkIn.gym.description}</Td>
            <Td>{checkIn.gym.phone}</Td>
            <Td>{checkIn.approved ? <FaCheck /> : <FiX strokeWidth={5} />}</Td>
            <Td>{format(new Date(checkIn.createdAt), 'dd/MM/yyyy HH:mm:ss')}</Td>
            <Td><Button disabled={checkIn.approved ? checkIn.approved : checkIntervalCheckIn(checkIn)} onClick={() => handleApproveCheckIn(checkIn.id)}>Aprovar</Button></Td>
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
              <Th>Usuario</Th>
              <Th>Academia</Th>
              <Th>Descrição</Th>
              <Th>Telefone</Th>
              <Th>Aprovado</Th>
              <Th>Data</Th>
              <Th>Opções</Th>
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