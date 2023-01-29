import { useEffect, useMemo, useState } from 'react';

import {
  Badge,
  Button,
  Container,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Table,
  TableContainer,
  Tbody,
  Thead,
  Td,
  Th,
  Tooltip,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { IoEyeOutline, IoReloadOutline, IoTrashOutline } from 'react-icons/io5';

import Pagination from '../components/Layout/Pagination';

import { useAuth } from '../context/authContext';
import { tasks as tasksApi } from '../services/tasks';

export default function History() {
  const toast = useToast();
  const { tokens, user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setIsLoading(true);

    tasksApi
      .getAll(tokens.accessToken)
      .then((response) => {
        setData(response.data);
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
            <Table colorScheme='brand.green'>
              <Thead>
                <Tr>
                  <Th>Название услуги</Th>
                  <Th>E-mail</Th>
                  <Th>Дата</Th>
                  <Th>Статус</Th>
                  <Th>Время обработки</Th>
                  {user.role === 'ADMIN' && <Th>Действия</Th>}
                </Tr>
              </Thead>
              <Tbody>
                {currentPageData.map((task, index) => (
                  <Tr key={index}>
                    <Td>{task.providerRequestName}</Td>
                    <Td>{task.userEmail}</Td>
                    <Td>{task.requestDate}</Td>
                    <Td>
                      <Badge
                        colorScheme={
                          task.requestStatus === 'COMPLETED'
                            ? 'brand.green'
                            : task.requestStatus === 'PENDING'
                            ? 'brand.yellow'
                            : 'brand.red'
                        }
                      >
                        {task.requestStatus}
                      </Badge>
                    </Td>
                    <Td>{task.responseTime / 1000} с</Td>
                    {user.role === 'ADMIN' && (
                      <Td>
                        <HStack>
                          <Popover>
                            <PopoverTrigger>
                              <Button colorScheme='brand.green'>
                                <Tooltip label='Повторить запрос' aria-label='Повторить запрос'>
                                  <IoEyeOutline />
                                </Tooltip>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                              <PopoverArrow />
                              <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
                            </PopoverContent>
                          </Popover>
                          <Tooltip label='Повторить запрос' aria-label='Повторить запрос'>
                            <Button colorScheme='brand.yellow'>
                              <IoReloadOutline />
                            </Button>
                          </Tooltip>
                          <Tooltip label='Удалить запрос' aria-label='Повторить запрос'>
                            <Button colorScheme='brand.red'>
                              <IoTrashOutline />
                            </Button>
                          </Tooltip>
                        </HStack>
                      </Td>
                    )}
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
