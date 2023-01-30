import { useEffect, useState, useMemo } from 'react';

import { Container, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react';

import Pagination from '../components/Layout/Pagination';

import { useAuth } from '../context/authContext';
import { actions as actionsApi } from '../services/actions';

export default function Logs() {
  const toast = useToast();
  const { tokens } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [pageData, setPageData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setIsLoading(true);

    actionsApi
      .getAll(tokens.accessToken, currentPage, pageSize)
      .then((res) => {
        const { data, pageNumber, totalCount } = res.data;

        const test = {
          [pageNumber]: data,
        };

        setPageData({
          [pageNumber]: data,
          ...pageData,
        });
        setCurrentPage(pageNumber);
        setTotalCount(totalCount);
      })
      .catch(() => {
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

  const handlePageChange = (page) => {
    setIsLoading(true);

    actionsApi.getAll(tokens.accessToken, page, pageSize).then((res) => {
      const { data, pageNumber, totalCount } = res.data;

      setPageData({
        [pageNumber]: data,
        ...pageData,
      });
      setCurrentPage(pageNumber);
      setTotalCount(totalCount);
    });

    setIsLoading(false);
  };

  const currentPageData = useMemo(() => {
    return pageData[currentPage] || [];
  }, [currentPage, pageData]);

  return (
    <Container maxWidth='container.xl'>
      {!isLoading ? (
        <>
          <TableContainer>
            <Table colorScheme='brand.green' variant='simple'>
              <Thead>
                <Tr>
                  <Th>Пользователь</Th>
                  <Th>IP адрес</Th>
                  <Th>Дата</Th>
                  <Th>Действие</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentPageData.map((elem, index) => (
                  <Tr key={index}>
                    <Td>{elem.user.email}</Td>
                    <Td>{elem.ipAddress}</Td>
                    <Td>{new Date(elem.dateTime + 'Z').toLocaleString('en-GB')}</Td>
                    <Td>{elem.action}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          {totalCount > pageSize && (
            <Pagination
              currentPage={currentPage}
              totalCount={totalCount}
              pageSize={pageSize}
              onPageChange={(page) => handlePageChange(page)}
            />
          )}
        </>
      ) : (
        <h1>Загрузка...</h1>
      )}
    </Container>
  );
}
