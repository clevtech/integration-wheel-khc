import { useState } from 'react';
import {
    IoArchiveOutline,
    IoContractOutline,
    IoDuplicateOutline,
    IoExpandOutline,
    IoPencilOutline,
    IoSaveOutline,
    IoTrashOutline,
} from 'react-icons/io5';
import {
    Badge,
    Button,
    Card,
    CardBody,
    Code,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    Stack,
    Text,
    useToast,
} from '@chakra-ui/react';

import { useAuth } from '../../context/authContext';
import { services as servicesApi } from '../../services/services';

export default function ServiceCard({ service, user, actions }) {
    const toast = useToast();
    const { tokens } = useAuth();

    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [name, setName] = useState(service.name);
    const [requestType, setRequestType] = useState(service.requestType);
    const [requestMethod, setRequestMethod] = useState(service.requestMethod);
    const [requestBody, setRequestBody] = useState(service.requestBody);
    const [systemPath, setSystemPath] = useState(service.systemPath);
    const [path, setPath] = useState(service.path);

    const [requestLanguage, setRequestLanguage] = useState('json');

    const handleArchive = () => servicesApi.archive(tokens.accessToken, service.id);

    const handleDuplicate = () => servicesApi.duplicate(tokens.accessToken, service.id);

    const handleDelete = () => {
        servicesApi
            .delete(tokens.accessToken, service.id)
            .then((res) => {
                if (res.status === 204) {
                    toast({
                        title: 'Успешно',
                        description: 'Услуга была успешно удалена',
                        status: 'success',
                        colorScheme: 'brand.green',
                        duration: 5000,
                        isClosable: true,
                    });

                    actions.onDelete(service.id);
                }
            })
            .catch(() => {
                toast({
                    title: 'Ошибка',
                    description: 'Не удалось удалить услугу',
                    status: 'error',
                    colorScheme: 'brand.red',
                    duration: 5000,
                    isClosable: true,
                });
            });
    };

    return (
        <Card variant='outline' width='100%' background='white'>
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
                        {!service.isActive && <Badge colorScheme='brand.yellow'>Архивный</Badge>}
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
                                rightIcon={isExpanded ? <IoContractOutline /> : <IoExpandOutline />}
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
                                            <Heading size='sm'>Путь по API</Heading>
                                            <Stack direction='column'>
                                                <Code>{service.systemPath}</Code>
                                                <Text>
                                                    В ответе вы получите номер транзакции, по которому вы сможете
                                                    проверить результат запросу на ссылку:
                                                </Text>
                                                <Code>
                                                    https://api.tahini.kz/api/v1/tasks/
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
                                            <Heading size='sm'>Пример запроса</Heading>
                                            <Select
                                                onChange={(e) => {
                                                    setRequestLanguage(e.target.value);
                                                }}
                                            >
                                                <option value='json'>JSON</option>
                                                <option value='xml'>XML</option>
                                            </Select>
                                            {requestLanguage === 'json' ? (
                                                <Code>{service.curlJsonString.replace('192.168.0.172:8083', '193.106.99.147:32777')}</Code>
                                            ) : (
                                                <Code>{service.curlXmlString.replace('192.168.0.172:8083', '193.106.99.147:32777')}</Code>
                                            )}
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
                                <Stack spacing='4'>
                                    <Stack
                                        direction={{
                                            base: 'column',
                                            md: 'row',
                                        }}
                                    >
                                        <FormControl
                                            isRequired
                                            width={{
                                                base: '100%',
                                                md: '50%',
                                            }}
                                        >
                                            <FormLabel>Название сервиса</FormLabel>
                                            <Input value={name} onChange={(e) => setName(e.target.value)} />
                                        </FormControl>
                                        <FormControl
                                            isRequired
                                            width={{
                                                base: '100%',
                                                md: '25%',
                                            }}
                                        >
                                            <FormLabel>Тип содержания</FormLabel>
                                            <Select
                                                value={requestType}
                                                onChange={(e) => setRequestType(e.target.value)}
                                            >
                                                <option value='JSON'>JSON</option>
                                                <option value='XML'>XML</option>
                                            </Select>
                                        </FormControl>
                                        <FormControl
                                            isRequired
                                            width={{
                                                base: '100%',
                                                md: '25%',
                                            }}
                                        >
                                            <FormLabel>Метод запроса</FormLabel>
                                            <Select
                                                value={requestMethod}
                                                onChange={(e) => setRequestMethod(e.target.value)}
                                            >
                                                <option value='get'>GET</option>
                                                <option value='post'>POST</option>
                                                <option value='put'>PUT</option>
                                                <option value='delete'>DELETE</option>
                                            </Select>
                                        </FormControl>
                                    </Stack>
                                    <Stack
                                        direction={{
                                            base: 'column',
                                            md: 'row',
                                        }}
                                    >
                                        <FormControl isRequired>
                                            <FormLabel>Путь API</FormLabel>
                                            <Input value={path} onChange={(e) => setPath(e.target.value)} />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel>Путь API внутри системы</FormLabel>
                                            <Input value={systemPath} onChange={(e) => setSystemPath(e.target.value)} />
                                        </FormControl>
                                    </Stack>
                                    <FormControl isRequired>
                                        <FormLabel>Тело запроса</FormLabel>
                                        <Input value={requestBody} onChange={(e) => setRequestBody(e.target.value)} />
                                    </FormControl>
                                </Stack>
                            )}
                            <Stack
                                direction={{
                                    base: 'column',
                                    md: 'row',
                                }}
                                justifyContent='flex-end'
                            >
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
                                    colorScheme='brand.yellow'
                                    leftIcon={<IoArchiveOutline />}
                                    onClick={handleArchive}
                                >
                                    {service.isActive ? 'Архивировать' : 'Восстановить'}
                                </Button>
                                <Button
                                    colorScheme='brand.yellow'
                                    leftIcon={<IoDuplicateOutline />}
                                    onClick={handleDuplicate}
                                >
                                    Дублировать
                                </Button>
                                <Button colorScheme='brand.red' leftIcon={<IoTrashOutline />} onClick={handleDelete}>
                                    Удалить
                                </Button>
                            </Stack>
                        </>
                    )}
                </Stack>
            </CardBody>
        </Card>
    );
}
