import { useEffect, useState } from 'react';
import { Container, Stack } from '@chakra-ui/react';

import UserCard from '../components/DataDisplay/UserCard';

import { useAuth } from '../context/authContext';
import { users as usersApi } from '../services/users';

export default function Users() {
    const { tokens } = useAuth();
    const { email: userEmail } = useAuth().user;

    const [users, setUsers] = useState([]);

    useEffect(() => {
        usersApi.getAll(tokens.accessToken).then((response) => {
            let { data } = response;

            const filteredData = data.filter(
                (user) => user.email !== userEmail
            );

            setUsers(filteredData);
        });
    }, []);

    return (
        <Container maxWidth='container.xl'>
            <Stack direction='column'>
                {users.map((user, index) => (
                    <UserCard key={index} user={user} />
                ))}
            </Stack>
        </Container>
    );
}
