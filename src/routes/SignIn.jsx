import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';

import { useAuth } from '../context/authContext';

// TODO : add extended color scheme for checkbox, input and button
export default function SignIn() {
    const { user, handleSignIn } = useAuth();

    if (user) {
        return <Navigate to='/services' />;
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleRememberMeChange = (e) => setRememberMe(e.target.checked);

    const handleSubmit = () => {
        if (email === '' || password === '') {
            return;
        }

        handleSignIn({ email, password, rememberMe });
    };

    return (
        <Container maxWidth='container.sm'>
            <Stack spacing='8'>
                <Stack spacing='2' textAlign='center'>
                    <Heading size='lg'>Войдите в ваш аккаунт</Heading>
                    <Stack
                        direction={{
                            base: 'column',
                            sm: 'row',
                        }}
                        justify='center'
                    >
                        <Text>У вас нет аккаунта?</Text>
                        <Button variant='link' color='brand.green.500'>
                            <Link to='/sign-up'>Зарегистрируйтесь</Link>
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
                                <FormLabel>Электронная почта</FormLabel>
                                <Input type='email' value={email} onChange={handleEmailChange} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Пароль</FormLabel>
                                <Input type='password' value={password} onChange={handlePasswordChange} />
                            </FormControl>
                        </Stack>
                        <HStack justify='space-between'>
                            <Checkbox
                                aria-label='remember-me'
                                colorScheme='brand.yellow'
                                onChange={handleRememberMeChange}
                            >
                                Запомнить
                            </Checkbox>
                            <Button variant='link' color='brand.green.500'>
                                Забыли пароль?
                            </Button>
                        </HStack>
                        <Button colorScheme='brand.yellow' onClick={handleSubmit}>
                            Войти
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
}
