import { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Card,
  CardBody,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  Heading,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { useAuth } from '../context/authContext';
import { tasks as tasksApi } from '../services/tasks';

export default function Analytics() {
  const { tokens } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    transactionsActive: 0,
    transactionsOverall: 0,
    transactionsError: 0,
    averageResponseTime: 0,
    topRequests: [
      {
        userId: '',
        userName: '',
        userRole: '',
      },
    ],
    recentRequests: [
      {
        userId: '',
        userName: '',
        requestDate: '',
        providerRequestName: '',
        requestStatus: '',
      },
    ],
  });

  useEffect(() => {
    setIsLoading(true);

    tasksApi
      .analytics(tokens.accessToken, {
        startDate: '',
        endDate: '',
      })
      .then((res) => {
        setStats(res.data);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    !isLoading && (
      <Container maxWidth='container.xl'>
        <Stack spacing='4'>
          <Stack spacing='4'>
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
            >
              <Card
                variant='outline'
                width={{
                  base: '100%',
                  md: 'calc(100% / 3)',
                }}
              >
                <CardBody>
                  <Text fontSize='sm' color='muted'>
                    Активные транзакции/всего
                  </Text>
                  <Stack direction='row' align='flex-end' justify='center' spacing='8'>
                    <Heading color='brand.green.400' size='2xl'>
                      {stats.transactionsActive}
                    </Heading>
                    <Heading color='muted'>{stats.transactionsOverall}</Heading>
                  </Stack>
                </CardBody>
              </Card>
              <Card
                variant='outline'
                width={{
                  base: '100%',
                  md: 'calc(100% / 3)',
                }}
              >
                <CardBody>
                  <Text fontSize='sm' color='muted'>
                    Ошибки от провайдеров
                  </Text>
                  <Heading color='brand.red.500'>{stats.transactionsError}</Heading>
                </CardBody>
              </Card>
              <Card
                variant='outline'
                width={{
                  base: '100%',
                  md: 'calc(100% / 3)',
                }}
              >
                <CardBody>
                  <Text fontSize='sm' color='muted'>
                    Среднее время обработки запросов
                  </Text>
                  <Heading color='brand.green.400'>{stats.averageResponseTime} мс</Heading>
                </CardBody>
              </Card>
            </Stack>
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
            >
              <Card
                variant='outline'
                width={{
                  base: '100%',
                  md: '20%',
                }}
              >
                <CardBody>
                  <Stack spacing='4' width='100%' height='100%'>
                    <Text fontSize='sm' color='muted'>
                      Успешные запросы
                    </Text>
                    <Stack width='100%' height='100%' align='center' justify='center'>
                      <CircularProgress
                        size='160px'
                        value={
                          ((stats.transactionsOverall - stats.transactionsError) / stats.transactionsOverall) * 100 || 0
                        }
                        color='brand.green.400'
                      >
                        <CircularProgressLabel>
                          {((stats.transactionsOverall - stats.transactionsError) / stats.transactionsOverall) * 100 ||
                            0}
                          %
                        </CircularProgressLabel>
                      </CircularProgress>
                    </Stack>
                  </Stack>
                </CardBody>
              </Card>
              <Card
                variant='outline'
                width={{
                  base: '100%',
                  md: '30%',
                }}
              >
                <CardBody>
                  <Stack spacing='4' width='100%' height='100%'>
                    <Text fontSize='sm' color='muted'>
                      Топ запросы
                    </Text>
                    <Stack justify='center' height='100%' spacing='3'>
                      {stats.topRequests.map((topRequest, index) => (
                        <Stack key={index} align='center' direction='row' spacing='4'>
                          <Avatar width='38px' height='38px' />
                          <Stack direction='column' spacing='0'>
                            <Text as='b' fontSize='15px'>
                              {topRequest.userName}
                            </Text>
                            <Text color='muted' fontSize='14px'>
                              {topRequest.userRole === 'MANAGER' ? 'Менеджер' : 'Администратор'}
                            </Text>
                          </Stack>
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                </CardBody>
              </Card>
              <Card
                variant='outline'
                width={{
                  base: '100%',
                  md: '50%',
                }}
              >
                <CardBody>
                  <Stack spacing='4'>
                    <Text fontSize='sm' color='muted'>
                      Последние запросы
                    </Text>
                    <TableContainer>
                      <Table colorScheme='brand.green' size='sm' variant='simple'>
                        <Thead>
                          <Tr>
                            <Th>Клиент</Th>
                            <Th>Дата</Th>
                            <Th>Услуга</Th>
                            <Th>Статус</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {stats.recentRequests.map((recentRequest, index) => (
                            <Tr key={index}>
                              <Td>
                                <Stack align='center' direction='row' spacing='4'>
                                  <Avatar width='38px' height='38px' />
                                  <Text fontSize='15px'>{recentRequest.userName}</Text>
                                </Stack>
                              </Td>
                              <Td>{recentRequest.requestDate}</Td>
                              <Td>{recentRequest.providerRequestName}</Td>
                              <Td>
                                <Badge
                                  colorScheme={
                                    recentRequest.requestStatus === 'COMPLETED'
                                      ? 'brand.green'
                                      : recentRequest.requestStatus === 'PENDING'
                                      ? 'brand.yellow'
                                      : 'brand.red'
                                  }
                                >
                                  {recentRequest.requestStatus}
                                </Badge>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Stack>
                </CardBody>
              </Card>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    )
  );
}
