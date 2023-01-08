import { useState } from 'react';
import { IoPencilOutline, IoSaveOutline, IoTrashOutline } from 'react-icons/io5';
import {
    Badge,
    Button,
    Card,
    CardBody,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
} from '@chakra-ui/react';

export default function TokenCard({ token }) {
    const [isEditing, setIsEditing] = useState(false);

    const [name, setName] = useState(token.name);
    const [description, setDescription] = useState(token.description);
    const [certificate, setCertificate] = useState(token?.certificate);
    const [signature, setSignature] = useState(token?.signature);
    const [tokenValue, setTokenValue] = useState(token?.tokenValue);
    const [expirationDate, setExpirationDate] = useState(token.expirationDate);

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <Card variant='outline' background='white'>
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
                        <Heading size='md'>{token.name}</Heading>
                        <Badge colorScheme='brand.yellow' marginLeft='2'>
                            {token?.certificate && token?.signature ? 'Тип ключа: ЭЦП' : 'Тип ключа: Токен'}
                        </Badge>
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
                        <Text>{token.description}</Text>
                    </Stack>
                    <Divider />
                    {isEditing && (
                        <Stack spacing='4'>
                            <Stack
                                direction={{
                                    base: 'column',
                                    md: 'row',
                                }}
                                spacing='4'
                            >
                                <FormControl isRequired>
                                    <FormLabel>Название</FormLabel>
                                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Описание</FormLabel>
                                    <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                                </FormControl>
                            </Stack>
                            {token?.certificate && token?.signature ? (
                                <>
                                    <FormControl isRequired>
                                        <FormLabel>Сертификат</FormLabel>
                                        <Input value={certificate} onChange={(e) => setCertificate(e.target.value)} />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Сигнатура</FormLabel>
                                        <Input value={signature} onChange={(e) => setSignature(e.target.value)} />
                                    </FormControl>
                                </>
                            ) : (
                                <FormControl isRequired>
                                    <FormLabel>Токен</FormLabel>
                                    <Input value={tokenValue} onChange={(e) => setTokenValue(e.target.value)} />
                                </FormControl>
                            )}
                            <FormControl isRequired>
                                <FormLabel>Активен до</FormLabel>
                                <Input
                                    type='date'
                                    value={expirationDate}
                                    onChange={(e) => setExpirationDate(e.target.value)}
                                />
                            </FormControl>
                        </Stack>
                    )}
                    <Stack>
                        <Stack
                            direction={{
                                base: 'column',
                                sm: 'row',
                            }}
                            justifyContent='flex-end'
                        >
                            {isEditing ? (
                                <Button colorScheme='brand.green' leftIcon={<IoSaveOutline />} onClick={handleSave}>
                                    Сохранить
                                </Button>
                            ) : (
                                <Button
                                    colorScheme='brand.yellow'
                                    leftIcon={<IoPencilOutline />}
                                    onClick={() => setIsEditing(true)}
                                >
                                    Редактировать
                                </Button>
                            )}
                            <Button colorScheme='brand.red' leftIcon={<IoTrashOutline />}>
                                Удалить
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </CardBody>
        </Card>
    );
}
