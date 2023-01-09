import { useState } from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useBreakpointValue,
    useToast,
} from '@chakra-ui/react';

import { useAuth } from '../context/authContext';
import { users as usersApi } from '../services/users';

export default function Settings() {
    const toast = useToast();

    const { user, tokens, handleProfileUpdate } = useAuth();

    const [lastName, setLastName] = useState(user.lastName);
    const [firstName, setFirstName] = useState(user.firstName);
    const [fatherName, setFatherName] = useState(user.fatherName);
    const [email, setEmail] = useState(user.email);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const handleLastNameChange = (e) => setLastName(e.target.value);
    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleFatherNameChange = (e) => setFatherName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleRePasswordChange = (e) => setRePassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        let data = {};

        if (lastName && lastName !== user.lastName) data.lastName = lastName;
        if (firstName && firstName !== user.firstName) data.firstName = firstName;
        if (fatherName && fatherName !== user.fatherName) data.fatherName = fatherName;
        if (email && email !== user.email && email.length > 0) data.email = email;
        if (phoneNumber && phoneNumber !== user.phoneNumber) data.phoneNumber = phoneNumber;
        if (password && password.length > 6) data.password = password;
        if (rePassword && rePassword.length > 6) data.rePassword = rePassword;

        if (Object.keys(data).length > 0 && password === rePassword) {
            usersApi
                .updateByToken(tokens.accessToken, data)
                .then((res) => {
                    const { data } = res;

                    const { lastName, firstName, fatherName, email, phoneNumber } = data;

                    handleProfileUpdate({ lastName, firstName, fatherName, email, phoneNumber });

                    toast({
                        title: 'Успешно',
                        description: 'Данные успешно изменены',
                        status: 'success',
                        colorScheme: 'brand.green',
                        duration: 5000,
                        isClosable: true,
                    });
                })
                .catch(() => {
                    toast({
                        title: 'Ошибка',
                        description: 'Что-то пошло не так',
                        status: 'error',
                        colorScheme: 'brand.red',
                        duration: 5000,
                        isClosable: true,
                    });
                });
        }
    };

    return (
        <Container maxWidth='container.sm'>
            <Stack spacing='8'>
                <Stack spacing='2' textAlign='center'>
                    <Heading size='lg'>Настройки</Heading>
                </Stack>
                <Box
                    py={{ base: '0', sm: '8' }}
                    px={{ base: '4', sm: '12' }}
                    background={useBreakpointValue({
                        base: 'transparent',
                        sm: 'white',
                    })}
                    boxShadow={{
                        base: 'none',
                        sm: 'md',
                    }}
                    borderRadius={{ base: 'none', sm: 'xl' }}
                >
                    <Stack spacing='6'>
                        <Stack spacing='5'>
                            <FormControl>
                                <FormLabel>Фамилия</FormLabel>
                                <Input type='text' value={lastName} onChange={handleLastNameChange} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Имя</FormLabel>
                                <Input type='text' value={firstName} onChange={handleFirstNameChange} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Отчество</FormLabel>
                                <Input type='text' value={fatherName} onChange={handleFatherNameChange} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Электронная почта</FormLabel>
                                <Input type='email' value={email} onChange={handleEmailChange} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Номер телефона</FormLabel>
                                <Input type='tel' value={phoneNumber} onChange={handlePhoneNumberChange} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Пароль</FormLabel>
                                <Input type='password' value={password} onChange={handlePasswordChange} />
                            </FormControl>
                            <FormControl isRequired={password === '' ? false : true}>
                                <FormLabel>Подтверждение пароля</FormLabel>
                                <Input type='password' value={rePassword} onChange={handleRePasswordChange} />
                            </FormControl>
                        </Stack>

                        <Button colorScheme='brand.yellow' onClick={handleSubmit}>
                            Изменить данные
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
}
