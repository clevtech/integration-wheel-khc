import { useEffect, useState } from 'react';

import { Button, Card, CardBody, Container, FormControl, FormLabel, Input, Select, Stack } from '@chakra-ui/react';
import { IoCloseOutline, IoPersonAddOutline } from 'react-icons/io5';

import UserCard from '../components/DataDisplay/UserCard';

import { useAuth } from '../context/authContext';
import { users as usersApi } from '../services/users';

export default function Users() {
  const { tokens } = useAuth();
  const { email: userEmail } = useAuth().user;

  const [isExpanded, setIsExpanded] = useState(false);
  const [users, setUsers] = useState([]);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [role, setRole] = useState('MANAGER');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  useEffect(() => {
    usersApi.getAll(tokens.accessToken).then((response) => {
      let { data } = response;

      const filteredData = data.filter((user) => user.email !== userEmail);

      setUsers(filteredData);
    });
  }, []);

  return (
    <Container maxWidth='container.xl'>
      <Stack
        direction={{
          base: 'column',
          sm: 'row',
        }}
        justify='flex-end'
      >
        <Button
          colorScheme={isExpanded ? 'brand.red' : 'brand.green'}
          leftIcon={isExpanded ? <IoCloseOutline /> : <IoPersonAddOutline />}
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? 'Скрыть' : 'Добавить ИС'}
        </Button>
      </Stack>
      {isExpanded && (
        <Card variant='outline' marginTop='4'>
          <CardBody>
            <Stack spacing='3'>
              <FormControl isRequired>
                <FormLabel>Электронная почта</FormLabel>
                <Input
                  type='email'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Имя</FormLabel>
                <Input
                  type='text'
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Фамилия</FormLabel>
                <Input
                  type='text'
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Отчество</FormLabel>
                <Input
                  type='text'
                  value={fatherName}
                  onChange={(e) => {
                    setFatherName(e.target.value);
                  }}
                />
              </FormControl>
              <Stack
                direction={{
                  base: 'column',
                  sm: 'row',
                }}
              >
                <FormControl isRequired>
                  <FormLabel>Роль</FormLabel>
                  <Select
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                  >
                    <option value='MANAGER'>Менеджер</option>
                    <option value='ADMIN'>Администратор</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Номер телефона</FormLabel>
                  <Input
                    type='tel'
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                  />
                </FormControl>
              </Stack>
              <Stack
                direction={{
                  base: 'column',
                  sm: 'row',
                }}
              >
                <FormControl isRequired>
                  <FormLabel>Пароль</FormLabel>
                  <Input
                    type='password'
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Повторите пароль</FormLabel>
                  <Input
                    type='password'
                    value={rePassword}
                    onChange={(e) => {
                      setRePassword(e.target.value);
                    }}
                  />
                </FormControl>
              </Stack>
              <Button
                colorScheme='brand.green'
                onClick={() => {
                  usersApi
                    .generate(tokens.accessToken, {
                      email,
                      firstName,
                      lastName,
                      fatherName,
                      role,
                      phoneNumber,
                      password,
                      rePassword,
                    })
                    .finally(() => {
                      setIsExpanded(false);

                      setEmail('');
                      setFirstName('');
                      setLastName('');
                      setFatherName('');
                      setRole('MANAGER');
                      setPhoneNumber('');
                      setPassword('');
                      setRePassword('');
                    });
                }}
              >
                Добавить
              </Button>
            </Stack>
          </CardBody>
        </Card>
      )}
      <Stack direction='column' marginTop='4'>
        {users.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </Stack>
    </Container>
  );
}
