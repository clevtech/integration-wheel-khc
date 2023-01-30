import { useEffect, useMemo, useState } from 'react';

import { Container, Table, TableContainer, Tbody, Text, Thead, Td, Th, Tooltip, Tr, useToast } from '@chakra-ui/react';

import HistoryTableRow from '../components/DataDisplay/HistoryTableRow';
import Pagination from '../components/Layout/Pagination';

import { useAuth } from '../context/authContext';
import { tasks as tasksApi } from '../services/tasks';

export default function History() {
  const toast = useToast();
  const { tokens, user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [pageData, setPageData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const actions = {
    resend: (id) => {
      tasksApi
        .resend(tokens.accessToken, id)
        .then(() => {
          toast({
            title: 'Успех',
            description: 'Запрос успешно отправлен',
            status: 'success',
            colorScheme: 'brand.green',
            duration: 5000,
            isClosable: true,
          });
        })
        .catch(() => {
          toast({
            title: 'Ошибка',
            description: 'Не удалось отправить запрос',
            status: 'error',
            colorScheme: 'brand.red',
            duration: 5000,
            isClosable: true,
          });
        });
    },

    cancel: (id) => {
      tasksApi
        .cancel(tokens.accessToken, id)
        .then(() => {
          toast({
            title: 'Успех',
            description: 'Запрос успешно отменен',
            status: 'success',
            colorScheme: 'brand.green',
            duration: 5000,
            isClosable: true,
          });
        })
        .catch(() => {
          toast({
            title: 'Ошибка',
            description: 'Не удалось отменить запрос',
            status: 'error',
            colorScheme: 'brand.red',
            duration: 5000,
            isClosable: true,
          });
        });
    },
  };

  useEffect(() => {
    setIsLoading(true);

    tasksApi
      .getAll(tokens.accessToken, currentPage, pageSize)
      .then((res) => {
        const { data, pageNumber, totalCount } = res.data;

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

    tasksApi
      .getAll(tokens.accessToken, page, pageSize)
      .then((res) => {
        const { data, pageNumber, totalCount } = res.data;

        setPageData({
          [pageNumber]: data,
          ...pageData,
        });
        setCurrentPage(pageNumber);
        setTotalCount(totalCount);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const currentPageData = useMemo(() => {
    return pageData[currentPage] || [];
  }, [currentPage, pageData]);

  return (
    <Container maxWidth='container.xl'>
      {!isLoading ? (
        <>
          <TableContainer>
            <Table colorScheme='brand.green'>
              <Thead>
                <Tr>
                  <Th>Название услуги</Th>
                  <Th>ИС</Th>
                  <Th>Дата</Th>
                  <Th>Статус</Th>
                  <Th>Время обработки</Th>
                  {user.role === 'ADMIN' && <Th>Действия</Th>}
                </Tr>
              </Thead>
              <Tbody>
                {currentPageData.map((elem, index) => (
                  <HistoryTableRow key={index} {...elem} actions={actions} />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={pageSize}
            onPageChange={(page) => handlePageChange(page)}
          />
        </>
      ) : (
        <h1>Загрузка...</h1>
      )}
    </Container>
  );
}
