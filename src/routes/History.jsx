import { useEffect, useState } from 'react';
import { Badge, Container, Table, TableContainer, Tbody, Thead, Td, Th, Tr } from '@chakra-ui/react';

import { useAuth } from '../context/authContext';
import { tasks as tasksApi } from '../services/tasks';

export default function History() {
    const [tasks, setTasks] = useState([]);

    const { tokens } = useAuth();

    useEffect(() => {
        tasksApi.getAll(tokens.accessToken).then((res) => {
            const { data } = res;

            setTasks(data);
        });
    }, []);

    return (
        <Container maxWidth='container.xl'>
            <TableContainer>
                <Table colorScheme='brand.green'>
                    <Thead>
                        <Tr>
                            <Th>Название услуги</Th>
                            <Th>E-mail пользователя</Th>
                            <Th>Дата запроса</Th>
                            <Th>Статус запроса</Th>
                            <Th>Время обработки запроса</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {tasks.map((task, index) => (
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
                                <Td>{task.responseTime}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    );
}
