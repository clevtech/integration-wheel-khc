import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Radio,
    RadioGroup,
    Stack,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';

import { useAuth } from '../context/authContext';
import { auth } from '../services/auth';

export default function SignUp() {
    const { user } = useAuth();

    if (user) {
        return <Navigate to='/services' />;
    }

    const navigate = useNavigate();

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [role, setRole] = useState('MANAGER');

    const handleLastNameChange = (e) => setLastName(e.target.value);
    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleFatherNameChange = (e) => setFatherName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleRePasswordChange = (e) => setRePassword(e.target.value);

    const handleSubmit = () => {
        if (
            lastName === '' ||
            firstName === '' ||
            email === '' ||
            phoneNumber === '' ||
            password === '' ||
            rePassword === '' ||
            role === ''
        ) {
            return;
        }

        if (password !== rePassword) {
            return;
        }

        const data = {
            lastName,
            firstName,
            fatherName,
            email,
            phoneNumber,
            password,
            rePassword,
            role,
        };

        auth.register(data);

        navigate('/');
    };

    return (
        <Container maxWidth='container.sm'>
            <Stack spacing='8'>
                <Stack spacing='2' textAlign='center'>
                    <Heading size='lg'>Зарегистрируйтесь</Heading>
                    <Stack
                        direction={{
                            base: 'column',
                            sm: 'row',
                        }}
                        justify='center'
                    >
                        <Text>Есть аккаунт?</Text>
                        <Button variant='link' color='brand.green.500'>
                            <Link to='/'>Вернуться назад</Link>
                        </Button>
                    </Stack>
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
                            <FormControl isRequired>
                                <FormLabel>Фамилия</FormLabel>
                                <Input
                                    type='text'
                                    value={lastName}
                                    onChange={handleLastNameChange}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Имя</FormLabel>
                                <Input
                                    type='text'
                                    value={firstName}
                                    onChange={handleFirstNameChange}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Отчество</FormLabel>
                                <Input
                                    type='text'
                                    value={fatherName}
                                    onChange={handleFatherNameChange}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Электронная почта</FormLabel>
                                <Input
                                    type='email'
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Номер телефона</FormLabel>
                                <Input
                                    type='tel'
                                    value={phoneNumber}
                                    onChange={handlePhoneNumberChange}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Пароль</FormLabel>
                                <Input
                                    type='password'
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Подтвердите ваш пароль</FormLabel>
                                <Input
                                    type='password'
                                    value={rePassword}
                                    onChange={handleRePasswordChange}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Роль</FormLabel>
                                <RadioGroup value={role} onChange={setRole}>
                                    <Stack direction='row'>
                                        <Radio
                                            value='MANAGER'
                                            colorScheme='brand.yellow'
                                        >
                                            Менеджер
                                        </Radio>
                                        <Radio
                                            value='ADMIN'
                                            colorScheme='brand.yellow'
                                        >
                                            Администратор
                                        </Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                        </Stack>
                        <Button
                            colorScheme='brand.yellow'
                            onClick={handleSubmit}
                        >
                            Запросить разрешения
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
}
