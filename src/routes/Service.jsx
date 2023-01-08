import { useEffect, useState } from 'react';
import { IoAddOutline, IoChevronBackOutline, IoRemoveOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardBody,
    Checkbox,
    Container,
    Divider,
    Button,
    ButtonGroup,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    Select,
    Stack,
    useToast,
} from '@chakra-ui/react';

import Editor from '@monaco-editor/react';

import { useAuth } from '../context/authContext';
import { providers as providersApi } from '../services/providers';
import { services as servicesApi } from '../services/services';

export default function Service() {
    const navigate = useNavigate();
    const toast = useToast();

    const { tokens } = useAuth();

    const [providers, setProviders] = useState([]);
    const [editorLanguage, setEditorLanguage] = useState('json');

    const [isSHEP, setIsSHEP] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [contentType, setContentType] = useState('application/json');
    const [body, setBody] = useState('');
    const [treeModel, setTreeModel] = useState({});
    const [requestMethod, setRequestMethod] = useState('GET');
    const [providerId, setProviderId] = useState();
    const [path, setPath] = useState('');
    const [headers, setHeaders] = useState([]);
    const [pathParameters, setPathParameters] = useState([]);
    const [pathVariables, setPathVariables] = useState([]);
    const [edsUsed, setEdsUsed] = useState(false);

    const [shepServiceId, setShepServiceId] = useState('');
    const [shepSenderId, setShepSenderId] = useState('');
    const [shepUsername, setShepUsername] = useState('');
    const [shepSenderCode, setShepSenderCode] = useState('');
    const [shepPassword, setShepPassword] = useState('');
    const [shepNameKz, setShepNameKz] = useState('');
    const [shepNameRu, setShepNameRu] = useState('');
    const [shepIsSmsRequired, setShepIsSmsRequired] = useState(false);

    const handleAnalyze = () => {
        servicesApi
            .generate(tokens.accessToken, {
                requestType: editorLanguage.toUpperCase(),
                body,
            })
            .then((res) => {
                setTreeModel(res.data);

                if (res.status === 200) {
                    toast({
                        title: 'Успешно',
                        description: 'Данные успешно обработаны',
                        status: 'success',
                        colorScheme: 'brand.green',
                        duration: 5000,
                        isClosable: true,
                    });
                }
            })
            .catch((err) => {
                toast({
                    title: 'Ошибка',
                    description: 'Перепроверьте введенные данные',
                    status: 'error',
                    colorScheme: 'brand.red',
                    duration: 5000,
                    isClosable: true,
                });
            });
    };

    const handleSubmit = () => {
        let editedPath = path;

        if (editedPath.charAt(editedPath.length - 1 !== '/')) {
            editedPath += '/';
        }

        editedPath = editedPath + pathVariables.map((pathVariable) => `{${pathVariable.key}}`).join('/');

        servicesApi
            .create(tokens.accessToken, {
                name,
                description,
                contentType,
                requestType: editorLanguage.toUpperCase(),
                treeModel,
                requestBody: body,
                requestMethod,
                edsId: '68b66cbd-61b4-4771-94e6-abb8a1225208',
                providerId,
                path: editedPath,
                systemPath: 'https://api.clevtech.kz/',
                pathParameters,
                pathVariables,
                headers,
                edsUsed,
            })
            .then((res) => {
                if (res.status === 200) {
                    toast({
                        title: 'Успешно',
                        description: 'Услуга создана',
                        status: 'success',
                        colorScheme: 'brand.green',
                        duration: 5000,
                        isClosable: true,
                    });
                }
            })
            .catch((err) => {
                toast({
                    title: 'Ошибка',
                    description: 'Перепроверьте введенные данные',
                    status: 'error',
                    colorScheme: 'brand.red',
                    duration: 5000,
                    isClosable: true,
                });
            });
    };

    useEffect(() => {
        providersApi.getAll(tokens.accessToken).then((res) => {
            setProviders(res.data);
            setProviderId(res.data[0].id);
        });
    }, []);

    return (
        <Container maxWidth='container.xl'>
            <Stack spacing='4'>
                <ButtonGroup>
                    <Button
                        colorScheme='brand.green'
                        leftIcon={<IoChevronBackOutline />}
                        variant='link'
                        onClick={() => navigate(-1)}
                    >
                        Назад
                    </Button>
                </ButtonGroup>
                <Stack
                    align='flex-start'
                    direction={{
                        base: 'column',
                        lg: 'row',
                    }}
                    spacing='4'
                >
                    <Card
                        variant='outline'
                        width={{
                            base: '100%',
                            lg: '50%',
                        }}
                        background='white'
                    >
                        <CardBody>
                            <Stack spacing='4'>
                                <FormControl isRequired>
                                    <FormLabel>Тип услуги</FormLabel>
                                    <Checkbox colorScheme='brand.yellow' onChange={(e) => setIsSHEP(e.target.checked)}>
                                        Услуга ШЭП / ВШЭП РК
                                    </Checkbox>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Выберите провайдера</FormLabel>
                                    <Select
                                        onChange={(e) => {
                                            setProviderId(e.target.value);
                                        }}
                                    >
                                        {providers.map((provider) => (
                                            <option key={provider.id} value={provider.id}>
                                                {provider.name}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Название услуги</FormLabel>
                                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                                </FormControl>
                                <Stack
                                    direction={{
                                        base: 'column',
                                        sm: 'row',
                                    }}
                                >
                                    <FormControl isRequired>
                                        <FormLabel>Путь по API</FormLabel>
                                        <Input
                                            value={path}
                                            onChange={(e) => {
                                                setPath(e.target.value);
                                            }}
                                        />
                                    </FormControl>
                                    <FormControl
                                        isRequired
                                        width={{
                                            base: '100%',
                                            sm: '100px',
                                        }}
                                    >
                                        <FormLabel>Метод</FormLabel>
                                        <Select
                                            value={requestMethod}
                                            onChange={(e) => setRequestMethod(e.target.value)}
                                        >
                                            <option value='GET'>GET</option>
                                            <option value='POST'>POST</option>
                                            <option value='PUT'>PUT</option>
                                            <option value='DELETE'>DELETE</option>
                                        </Select>
                                    </FormControl>
                                </Stack>
                                <FormControl isRequired>
                                    <FormLabel>Описание</FormLabel>
                                    <Input
                                        value={description}
                                        onChange={(e) => {
                                            setDescription(e.target.value);
                                        }}
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Тип содержания</FormLabel>
                                    <Select value={contentType} onChange={(e) => setContentType(e.target.value)}>
                                        <option value='JSON'>application/json</option>
                                        <option value='XML'>application/xml</option>
                                    </Select>
                                </FormControl>
                                {isSHEP ? (
                                    <>
                                        <FormControl>
                                            <FormLabel>Данные для подключения</FormLabel>
                                            <Stack spacing='4'>
                                                <Stack
                                                    direction={{
                                                        base: 'column',
                                                        md: 'row',
                                                    }}
                                                >
                                                    <FormControl isRequired>
                                                        <FormLabel>serviceId</FormLabel>
                                                        <Input
                                                            value={shepServiceId}
                                                            onChange={(e) => setShepServiceId(e.target.value)}
                                                        />
                                                    </FormControl>
                                                    <FormControl isRequired>
                                                        <FormLabel>senderId</FormLabel>
                                                        <Input
                                                            value={shepSenderId}
                                                            onChange={(e) => setShepSenderId(e.target.value)}
                                                        />
                                                    </FormControl>
                                                </Stack>
                                                <Stack
                                                    direction={{
                                                        base: 'column-reverse',
                                                        md: 'row',
                                                    }}
                                                >
                                                    <FormControl isRequired>
                                                        <FormLabel>username</FormLabel>
                                                        <Input
                                                            value={shepUsername}
                                                            onChange={(e) => setShepUsername(e.target.value)}
                                                        />
                                                    </FormControl>
                                                    <FormControl isRequired>
                                                        <FormLabel>senderCode</FormLabel>
                                                        <Input
                                                            value={shepSenderCode}
                                                            onChange={(e) => setShepSenderCode(e.target.value)}
                                                        />
                                                    </FormControl>
                                                </Stack>
                                                <Stack
                                                    direction={{
                                                        base: 'column',
                                                        md: 'row',
                                                    }}
                                                >
                                                    <FormControl isRequired>
                                                        <FormLabel>password</FormLabel>
                                                        <Input
                                                            value={shepPassword}
                                                            onChange={(e) => setShepPassword(e.target.value)}
                                                        />
                                                    </FormControl>
                                                    <FormControl isRequired>
                                                        <FormLabel>nameKZ</FormLabel>
                                                        <Input
                                                            value={shepNameKz}
                                                            onChange={(e) => setShepNameKz(e.target.value)}
                                                        />
                                                    </FormControl>
                                                </Stack>
                                                <Stack
                                                    direction={{
                                                        base: 'column-reverse',
                                                        md: 'row',
                                                    }}
                                                >
                                                    <FormControl isRequired>
                                                        <FormLabel>СМС верификация</FormLabel>
                                                        <Checkbox
                                                            colorScheme='brand.yellow'
                                                            onChange={(e) => shepIsSmsRequired(e.target.checked)}
                                                        >
                                                            Услуга требует СМС верификации
                                                        </Checkbox>
                                                    </FormControl>
                                                    <FormControl isRequired>
                                                        <FormLabel>nameRU</FormLabel>
                                                        <Input
                                                            value={shepNameRu}
                                                            onChange={(e) => setShepNameRu(e.target.value)}
                                                        />
                                                    </FormControl>
                                                </Stack>
                                            </Stack>
                                        </FormControl>
                                        <Divider />
                                        <Stack>
                                            <Button colorScheme='brand.yellow' variant='outline'>
                                                Создать
                                            </Button>
                                        </Stack>
                                    </>
                                ) : (
                                    <>
                                        <FormControl>
                                            <Stack direction='row' justify='space-between'>
                                                <FormLabel>Заголовки запроса (request headers)</FormLabel>
                                                <IconButton
                                                    icon={<IoAddOutline />}
                                                    colorScheme='brand.green'
                                                    onClick={() => {
                                                        setHeaders([
                                                            ...headers,
                                                            {
                                                                key: '',
                                                                value: '',
                                                            },
                                                        ]);
                                                    }}
                                                />
                                            </Stack>
                                            <Stack spacing='4'>
                                                {headers.map((header, index) => (
                                                    <Stack key={index} direction='row' align='flex-end'>
                                                        <FormControl isRequired>
                                                            <FormLabel>key</FormLabel>
                                                            <Input
                                                                value={header.key}
                                                                onChange={(e) => {
                                                                    const newHeaders = [...headers];
                                                                    newHeaders[index].key = e.target.value;
                                                                    setHeaders(newHeaders);
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormControl isRequired>
                                                            <FormLabel>value</FormLabel>
                                                            <Input
                                                                value={header.value}
                                                                onChange={(e) => {
                                                                    const newHeaders = [...headers];
                                                                    newHeaders[index].value = e.target.value;
                                                                    setHeaders(newHeaders);
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <IconButton
                                                            icon={<IoRemoveOutline />}
                                                            colorScheme='brand.red'
                                                            onClick={() => {
                                                                setHeaders(headers.filter((_, i) => i !== index));
                                                            }}
                                                        />
                                                    </Stack>
                                                ))}
                                            </Stack>
                                        </FormControl>
                                        <FormControl marginTop={headers.length > 0 ? '16' : '0'}>
                                            <Stack direction='row' justify='space-between'>
                                                <FormLabel>Переменные пути (path variables)</FormLabel>
                                                <IconButton
                                                    icon={<IoAddOutline />}
                                                    colorScheme='brand.green'
                                                    onClick={() => {
                                                        setPathVariables([
                                                            ...pathVariables,
                                                            {
                                                                key: '',
                                                                value: '',
                                                            },
                                                        ]);
                                                    }}
                                                />
                                            </Stack>
                                            <Stack spacing='4'>
                                                {pathVariables.map((pathVariable, index) => (
                                                    <Stack key={index} direction='row' align='flex-end'>
                                                        <FormControl isRequired>
                                                            <FormLabel>key</FormLabel>
                                                            <Input
                                                                value={pathVariable.key}
                                                                onChange={(e) => {
                                                                    const newPathVariables = [...pathVariables];
                                                                    newPathVariables[index].key = e.target.value;
                                                                    setPathVariables(newPathVariables);
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormControl isRequired>
                                                            <FormLabel>value</FormLabel>
                                                            <Input
                                                                value={pathVariable.value}
                                                                onChange={(e) => {
                                                                    const newPathVariables = [...pathVariables];
                                                                    newPathVariables[index].value = e.target.value;
                                                                    setPathVariables(newPathVariables);
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <IconButton
                                                            icon={<IoRemoveOutline />}
                                                            colorScheme='brand.red'
                                                            onClick={() => {
                                                                setPathVariables(
                                                                    pathVariables.filter((_, i) => i !== index)
                                                                );
                                                            }}
                                                        />
                                                    </Stack>
                                                ))}
                                            </Stack>
                                        </FormControl>
                                        <FormControl marginTop={pathVariables.length > 0 ? 12 : 0}>
                                            <Stack direction='row' justify='space-between'>
                                                <FormLabel>Параметры пути (path parameters)</FormLabel>
                                                <IconButton
                                                    icon={<IoAddOutline />}
                                                    colorScheme='brand.green'
                                                    onClick={() => {
                                                        setPathParameters([
                                                            ...pathParameters,
                                                            {
                                                                key: '',
                                                                value: '',
                                                            },
                                                        ]);
                                                    }}
                                                />
                                            </Stack>
                                            <Stack spacing='4'>
                                                {pathParameters.map((pathParameter, index) => (
                                                    <Stack key={index} direction='row' align='flex-end'>
                                                        <FormControl isRequired>
                                                            <FormLabel>key</FormLabel>
                                                            <Input
                                                                value={pathParameter.key}
                                                                onChange={(e) => {
                                                                    const newPathParameters = [...pathParameters];
                                                                    newPathParameters[index].key = e.target.value;
                                                                    setPathParameters(newPathParameters);
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormControl isRequired>
                                                            <FormLabel>value</FormLabel>
                                                            <Input
                                                                value={pathParameter.value}
                                                                onChange={(e) => {
                                                                    const newPathParameters = [...pathParameters];
                                                                    newPathParameters[index].value = e.target.value;
                                                                    setPathParameters(newPathParameters);
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <IconButton
                                                            icon={<IoRemoveOutline />}
                                                            colorScheme='brand.red'
                                                            onClick={() => {
                                                                setPathParameters(
                                                                    pathParameters.filter((_, i) => i !== index)
                                                                );
                                                            }}
                                                        />
                                                    </Stack>
                                                ))}
                                            </Stack>
                                        </FormControl>
                                        <Divider />
                                        <Stack>
                                            <Button
                                                colorScheme='brand.yellow'
                                                variant='outline'
                                                disabled={Object.keys(treeModel).length || requestMethod === 'GET' !== 0 ? false : true}
                                                onClick={handleSubmit}
                                            >
                                                Создать
                                            </Button>
                                        </Stack>
                                    </>
                                )}
                            </Stack>
                        </CardBody>
                    </Card>
                    <Card
                        variant='outline'
                        width={{
                            base: '100%',
                            lg: '50%',
                        }}
                        background='white'
                    >
                        <CardBody>
                            <Stack spacing='4' height='100%'>
                                <Stack direction='row' justify='flex-end'>
                                    <Select
                                        type={editorLanguage}
                                        onChange={(e) => {
                                            setEditorLanguage(e.target.value);
                                            setBody('');
                                        }}
                                    >
                                        <option value='json'>JSON</option>
                                        <option value='xml'>XML</option>
                                    </Select>
                                    <Button
                                        variant='outline'
                                        onClick={() => {
                                            setBody('');
                                        }}
                                    >
                                        Очистить
                                    </Button>
                                </Stack>
                                <Divider />
                                <Editor
                                    language={editorLanguage}
                                    options={{
                                        fontFamily: 'monospace',
                                        fontSize: 14,
                                        lineNumbers: 'on',
                                        minimap: {
                                            enabled: false,
                                        },
                                        scrollBeyondLastLine: true,
                                        scrollbar: {
                                            verticalScrollbarSize: 0,
                                            horizontalScrollbarSize: 0,
                                        },
                                        wordWrap: 'on',
                                    }}
                                    width='100%'
                                    height='350px'
                                    value={body}
                                    onPaste={(e) => {
                                        setBody(e);
                                    }}
                                    onChange={(e) => {
                                        setBody(e);
                                    }}
                                />
                                <Divider />
                                <Stack justify='flex-end'>
                                    <Button
                                        colorScheme='brand.yellow'
                                        variant='outline'
                                        onClick={handleAnalyze}
                                        disabled={body.length === 0 ? true : false}
                                    >
                                        Анализировать
                                    </Button>
                                </Stack>
                            </Stack>
                        </CardBody>
                    </Card>
                </Stack>
            </Stack>
        </Container>
    );
}
