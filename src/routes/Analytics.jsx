import {
    Avatar,
    Card,
    CardBody,
    CircularProgress,
    CircularProgressLabel,
    Container,
    Flex,
    Heading,
    SimpleGrid,
    Stack,
    Text,
} from '@chakra-ui/react';

export default function Analytics() {
    const stats = [
        {
            label: 'Количество запросов',
            value: '71,887',
            color: 'brand.green.500',
        },
        {
            label: 'Ошибки от провайдеров',
            value: '26',
            color: 'brand.red.500',
        },
        {
            label: 'Среднее время обработки запроса',
            value: '500 мс',
            color: 'brand.green.500',
        },
    ];

    return (
        <Container maxWidth='container.xl'>
            <Stack spacing='4'>
                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 3,
                    }}
                    gap={{
                        base: '4',
                    }}
                >
                    {stats.map((stat, index) => (
                        <Card key={index} variant='outline'>
                            <CardBody>
                                <Text fontSize='sm' color='muted'>
                                    {stat.label}
                                </Text>
                                <Heading color={stat.color}>
                                    {stat.value}
                                </Heading>
                            </CardBody>
                        </Card>
                    ))}
                    <Card variant='outline'>
                        <CardBody>
                            <Stack spacing='4'>
                                <Text fontSize='sm' color='muted'>
                                    Успешные запросы
                                </Text>
                                <Flex align='center' justify='center'>
                                    <CircularProgress
                                        size='160px'
                                        value={83}
                                        color='brand.green.500'
                                    >
                                        <CircularProgressLabel>
                                            83%
                                        </CircularProgressLabel>
                                    </CircularProgress>
                                </Flex>
                            </Stack>
                        </CardBody>
                    </Card>
                    <Card variant='outline'>
                        <CardBody>
                            <Stack spacing='4'>
                                <Text fontSize='sm' color='muted'>
                                    Топ запросов
                                </Text>
                                <Stack>
                                    <Stack align='center' direction='row'>
                                        <Avatar />
                                        <Stack direction='column' spacing='0'>
                                            <Text as='b'>
                                                Фамилия Имя Отчество
                                            </Text>
                                            <Text color='muted'>Позиция</Text>
                                        </Stack>
                                    </Stack>
                                    <Stack align='center' direction='row'>
                                        <Avatar />
                                        <Stack direction='column' spacing='0'>
                                            <Text as='b'>
                                                Фамилия Имя Отчество
                                            </Text>
                                            <Text color='muted'>Позиция</Text>
                                        </Stack>
                                    </Stack>
                                    <Stack align='center' direction='row'>
                                        <Avatar />
                                        <Stack direction='column' spacing='0'>
                                            <Text as='b'>
                                                Фамилия Имя Отчество
                                            </Text>
                                            <Text color='muted'>Позиция</Text>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </CardBody>
                    </Card>
                    <Card variant='outline'>
                        <CardBody>
                            <Stack spacing='4'>
                                <Text fontSize='sm' color='muted'>
                                    Последние запросы
                                </Text>
                                <Stack>
                                    <Stack align='center' direction='row'>
                                        <Avatar />
                                        <Stack direction='column' spacing='0'>
                                            <Text as='b'>
                                                Фамилия Имя Отчество
                                            </Text>
                                            <Text color='muted'>Позиция</Text>
                                        </Stack>
                                    </Stack>
                                    <Stack align='center' direction='row'>
                                        <Avatar />
                                        <Stack direction='column' spacing='0'>
                                            <Text as='b'>
                                                Фамилия Имя Отчество
                                            </Text>
                                            <Text color='muted'>Позиция</Text>
                                        </Stack>
                                    </Stack>
                                    <Stack align='center' direction='row'>
                                        <Avatar />
                                        <Stack direction='column' spacing='0'>
                                            <Text as='b'>
                                                Фамилия Имя Отчество
                                            </Text>
                                            <Text color='muted'>Позиция</Text>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </CardBody>
                    </Card>
                </SimpleGrid>
                <Card width='100%' variant='outline'>
                    <CardBody></CardBody>
                </Card>
            </Stack>
        </Container>
    );
}
