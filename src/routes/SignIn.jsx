import { useEffect, useState } from 'react';

import jwtDecode from 'jwt-decode';

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
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import { useCookies } from 'react-cookie';
import { Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/authContext';
import { auth as authApi } from '../services/auth';

export default function SignIn() {
  const { user, setUser, setTokens } = useAuth();

  if (user) {
    return <Navigate to='/services' />;
  }

  const navigate = useNavigate();
  const toast = useToast();

  const [cookies, setCookie] = useCookies(['tokens', 'user']);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRememberMeChange = (e) => setRememberMe(e.target.checked);

  const handleSubmit = async () => {
    if (email === '' || password === '' || email === null || password === null) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, заполните все поля',
        status: 'error',
        colorScheme: 'brand.red',
        duration: 5000,
        isClosable: true,
      });
    } else {
      authApi
        .login({ email, password })
        .then((res) => {
          const { accessToken, refreshToken } = res.data;

          const decoded = jwtDecode(accessToken);

          const userData = {
            lastName: decoded?.user.lastName,
            firstName: decoded?.user.firstName,
            fatherName: decoded?.user.fatherName,
            email: decoded?.user.email,
            phoneNumber: decoded?.user.phoneNumber,
            role: decoded?.user.role,
          };

          console.log(userData);

          setTokens({ accessToken, refreshToken });
          setUser(userData);

          const expirationInSeconds = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 50;

          setCookie(
            'tokens',
            { accessToken, refreshToken },
            {
              expires: new Date(Date.now() + expirationInSeconds * 1000),
              maxAge: expirationInSeconds,
            }
          );
          setCookie(
            'user',
            { ...userData },
            {
              expires: new Date(Date.now() + expirationInSeconds * 1000),
              maxAge: expirationInSeconds,
            }
          );
        })
        .catch(() =>
          toast({
            title: 'Ошибка',
            description: 'Неверный логин или пароль',
            status: 'error',
            colorScheme: 'brand.red',
            duration: 5000,
            isClosable: true,
          })
        );
    }
  };

  return (
    <Container maxWidth='container.sm'>
      <Stack spacing='8'>
        <Stack spacing='2' textAlign='center'>
          <Heading size='lg'>Войдите в ваш аккаунт</Heading>
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
            <HStack
              justify={{
                base: 'space-between',
              }}
            >
              <Checkbox aria-label='remember-me' colorScheme='brand.yellow' onChange={handleRememberMeChange}>
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
