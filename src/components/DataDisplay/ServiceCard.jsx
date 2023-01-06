import { useState } from 'react';
import {
    IoContractOutline,
    IoExpandOutline,
    IoPencilOutline,
    IoSaveOutline,
    IoTrashOutline,
} from 'react-icons/io5';
import {
    Badge,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    Code,
    Divider,
    Heading,
    Stack,
    Text,
} from '@chakra-ui/react';

export default function ServiceCard({ service, user }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    console.log(service);

    return (
        <Card variant='outline' width='100%'>
            <CardBody>
                <Stack gap='4'>
                    <Stack
                        align={{
                            base: 'flex-start',
                            md: 'center',
                        }}
                        direction={{
                            base: 'column',
                            md: 'row',
                        }}
                        spacing='4'
                    >
                        <Heading size='md'>{service.name}</Heading>
                        {!service.isActive && (
                            <Badge colorScheme='brand.yellow'>Архивный</Badge>
                        )}
                    </Stack>
                    <Stack
                        align={{
                            base: 'flex-start',
                            md: 'center',
                        }}
                        direction={{
                            base: 'column',
                            md: 'row',
                        }}
                        justify='space-between'
                        spacing={{
                            base: '4',
                            md: '4',
                        }}
                    >
                        <Text>{service.description}</Text>
                        {user.role === 'MANAGER' && (
                            <Button
                                colorScheme='brand.yellow'
                                rightIcon={
                                    isExpanded ? (
                                        <IoContractOutline />
                                    ) : (
                                        <IoExpandOutline />
                                    )
                                }
                                onClick={() => {
                                    setIsExpanded(!isExpanded);
                                }}
                            >
                                {isExpanded ? 'Свернуть' : 'Подробнее'}
                            </Button>
                        )}
                    </Stack>
                    {user.role === 'MANAGER' && isExpanded && (
                        <>
                            <Divider />
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
                                        md: '50%',
                                    }}
                                >
                                    <CardBody>
                                        <Stack direction='column' spacing='4'>
                                            <Heading size='sm'>
                                                Путь по API
                                            </Heading>
                                            <Stack direction='column'>
                                                <Code>
                                                    {service.systemPath}
                                                </Code>
                                                <Text>
                                                    В ответе вы получите номер
                                                    транзакции, по которому вы
                                                    сможете проверить результат
                                                    вашего запроса по команде:
                                                </Text>
                                                <Code>
                                                    curl
                                                    http://192.168.0.172:8083/api/v1/tasks/
                                                    {'{'}transaction_id{'}'}
                                                </Code>
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
                                            <Heading size='sm'>
                                                Пример запроса
                                            </Heading>
                                            <Code>{service.curlString}</Code>
                                        </Stack>
                                    </CardBody>
                                </Card>
                            </Stack>
                        </>
                    )}
                    {user.role === 'ADMIN' && (
                        <>
                            <Divider />
                            {isEditing && (
                                <Stack>
                                    <Text>петух</Text>
                                </Stack>
                            )}
                            <ButtonGroup justifyContent='flex-end'>
                                {isEditing ? (
                                    <Button
                                        colorScheme='brand.green'
                                        leftIcon={<IoSaveOutline />}
                                        onClick={() => {
                                            setIsEditing(!isEditing);
                                        }}
                                    >
                                        Сохранить
                                    </Button>
                                ) : (
                                    <Button
                                        colorScheme='brand.yellow'
                                        leftIcon={<IoPencilOutline />}
                                        onClick={() => {
                                            setIsEditing(!isEditing);
                                        }}
                                    >
                                        Редактировать
                                    </Button>
                                )}
                                <Button
                                    colorScheme='brand.red'
                                    leftIcon={<IoTrashOutline />}
                                >
                                    Удалить
                                </Button>
                            </ButtonGroup>
                        </>
                    )}
                </Stack>
            </CardBody>
        </Card>
    );
}
