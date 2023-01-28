import { useEffect, useState, useMemo } from 'react';

import { Button, Container, HStack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

import Pagination from '../components/Layout/Pagination';

export default function Logs() {
  const [data, setData] = useState([
    {
      user: 'Иванов Иван Иванович 1',
      date: '01.01.2021 00:00:00',
      ip: '192.168.0.12',
      action: 'Вход в систему',
    },
    {
      user: 'Иванов Иван Иванович 2',
      date: '01.01.2021 00:00:00',
      ip: '192.168.0.12',
      action: 'Вход в систему',
    },
    {
      user: 'Иванов Иван Иванович 3',
      date: '01.01.2021 00:00:00',
      ip: '192.168.0.12',
      action: 'Вход в систему',
    },
    {
      user: 'Иванов Иван Иванович 4',
      date: '01.01.2021 00:00:00',
      ip: '192.168.0.12',
      action: 'Вход в систему',
    },
    {
      user: 'Иванов Иван Иванович 5',
      date: '01.01.2021 00:00:00',
      ip: '192.168.0.12',
      action: 'Вход в систему',
    },
    {
      user: 'Иванов Иван Иванович 6',
      date: '01.01.2021 00:00:00',
      ip: '192.168.0.12',
      action: 'Вход в систему',
    },
    {
      user: 'Иванов Иван Иванович 7',
      date: '01.01.2021 00:00:00',
      ip: '192.168.0.12',
      action: 'Вход в систему',
    },
    {
      user: 'Иванов Иван Иванович 8',
      date: '01.01.2021 00:00:00',
      ip: '192.168.0.12',
      action: 'Вход в систему',
    },
    {
      user: 'Иванов Иван Иванович 9',
      date: '01.01.2021 00:00:00',
      ip: '192.168.0.12',
      action: 'Вход в систему',
    },
    {
      user: 'Иванов Иван Иванович 10',
      date: '01.01.2021 00:00:00',
      ip: '192.168.0.12',
      action: 'Вход в систему',
    },
    {
      user: 'Иванов Иван Иванович 11',
      date: '01.01.2021 00:00:00',
      ip: '192.168.0.12',
      action: 'Вход в систему',
    },
    {
      user: 'Иванов Иван Иванович 12',
      date: '01.01.2021 00:00:00',
      ip: '192.168.0.12',
      action: 'Вход в систему',
    },
    {
      user: 'Иванов Иван Иванович 13',
      date: '01.01.2021 00:00:00',
      ip: '192.168.0.12',
      action: 'Вход в систему',
    },
    {
      user: 'Иванов Иван Иванович 14',
      date: '01.01.2021 00:00:00',
      ip: '192.168.0.12',
      action: 'Вход в систему',
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const currentPageData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <Container maxWidth='container.xl'>
      <TableContainer>
        <Table colorScheme='brand.green' variant='simple'>
          <Thead>
            <Tr>
              <Th>Пользователь</Th>
              <Th>Дата</Th>
              <Th>IP адрес</Th>
              <Th>Действие</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentPageData.map((elem, index) => (
              <Tr key={index}>
                <Td>{elem.user}</Td>
                <Td>{elem.date}</Td>
                <Td>{elem.ip}</Td>
                <Td>{elem.action}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Container>
  );
}
