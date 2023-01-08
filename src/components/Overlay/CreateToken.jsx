import { useEffect, useState } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Stack,
} from '@chakra-ui/react';

import { useAuth } from '../../context/authContext';
import { tokens as tokensApi } from '../../services/tokens';

export default function CreateToken({ isOpen, onClose }) {
    const { accessToken } = useAuth().tokens;

    const [type, setType] = useState('eds');

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [certificate, setCertificate] = useState('');
    const [signature, setSignature] = useState('');
    const [tokenValue, setTokenValue] = useState('');
    const [expirationDate, setExpirationDate] = useState('');

    const handleSubmit = () => {
        if (type === 'eds') {
            tokensApi
                .create(accessToken, {
                    name,
                    description,
                    certificate,
                    signature,
                    expirationDate,
                    createdDate: new Date().toISOString().split('T')[0],
                })
                .then((res) => {
                    console.log(res);
                });
        }
    };

    return (
        <Modal
            closeOnOverlayClick={false}
            isOpen={isOpen}
            onClose={onClose}
            size='5xl'
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Новый ЭЦП/Токен</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Stack spacing='4'>
                        <Stack
                            direction={{
                                base: 'column',
                                md: 'row',
                            }}
                            spacing='4'
                        >
                            <FormControl>
                                <FormLabel>Название</FormLabel>
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Тип</FormLabel>
                                <Select
                                    placeholder='Выберите тип'
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value='eds'>ЭЦП</option>
                                    <option value='token'>Токен</option>
                                </Select>
                            </FormControl>
                        </Stack>
                        <FormControl>
                            <FormLabel>Описание</FormLabel>
                            <Input
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormControl>
                        {type === 'eds' ? (
                            <>
                                <FormControl>
                                    <FormLabel>Сертификат</FormLabel>
                                    <Input
                                        value={certificate}
                                        onChange={(e) =>
                                            setCertificate(e.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Сигнатура</FormLabel>
                                    <Input
                                        value={signature}
                                        onChange={(e) =>
                                            setSignature(e.target.value)
                                        }
                                    />
                                </FormControl>
                            </>
                        ) : (
                            <FormControl>
                                <FormLabel>Значение токена</FormLabel>
                                <Input
                                    value={tokenValue}
                                    onChange={(e) =>
                                        setTokenValue(e.target.value)
                                    }
                                />
                            </FormControl>
                        )}
                        <FormControl>
                            <FormLabel>Активен до</FormLabel>
                            <Input
                                type='date'
                                value={expirationDate}
                                onChange={(e) => {
                                    setExpirationDate(e.target.value);
                                }}
                            />
                        </FormControl>
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Stack direction='row'>
                        <Button onClick={onClose}>Отмена</Button>
                        <Button
                            colorScheme='brand.yellow'
                            onClick={handleSubmit}
                        >
                            Создать
                        </Button>
                    </Stack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
