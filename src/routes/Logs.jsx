import { useEffect, useState, useMemo } from 'react';

import { Container, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react';

import Pagination from '../components/Layout/Pagination';

import { useAuth } from '../context/authContext';
import { actions as actionsApi } from '../services/actions';

export default function Logs() {
  const { tokens } = useAuth();
  const toast = useToast();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setIsLoading(true);

    actionsApi
      .getAll(tokens.accessToken)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        toast({
          title: 'Ошибка',
          description: 'Не удалось загрузить данные',
          status: 'error',
          colorScheme: 'brand.red',
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const currentPageData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

  return (
    <Container maxWidth='container.xl'>
      {!isLoading ? (
        <>
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
                    <Td>{elem.user.email}</Td>
                    <Td>{elem.ipAddress}</Td>
                    <Td>{elem.dateTime}</Td>
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
        </>
      ) : (
        <h1>Загрузка...</h1>
      )}
    </Container>
  );
}
