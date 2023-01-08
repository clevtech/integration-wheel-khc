import { useState } from 'react';
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
import { users as usersApi } from '../services/users';

export default function Settings() {
    const { user } = useAuth();

    const [email, setEmail] = useState(user.email);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        let data = {};

        if (email && email !== user.email && email.length > 0) data.email = email;
        if (phoneNumber && phoneNumber !== user.phoneNumber) data.phoneNumber = phoneNumber;
        if (password && password.length > 6) data.password = password;

        if (Object.keys(data).length > 0) {
            usersApi.updateByToken(user.token, data).then((res) => {});
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
                            <FormControl isRequired>
                                <FormLabel>Электронная почта</FormLabel>
                                <Input type='email' value={email} onChange={handleEmailChange} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Номер телефона</FormLabel>
                                <Input type='tel' value={phoneNumber} onChange={handlePhoneNumberChange} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Пароль</FormLabel>
                                <Input type='password' value={password} onChange={handlePasswordChange} />
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
