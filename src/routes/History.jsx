import {
    Container,
    Table,
    TableContainer,
    Tbody,
    Thead,
    Td,
    Th,
    Tr,
} from '@chakra-ui/react';

export default function History() {
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
                        <Tr>
                            <Td>нет данных</Td>
                            <Td>нет данных</Td>
                            <Td>нет данных</Td>
                            <Td>нет данных</Td>
                            <Td>нет данных</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    );
}
