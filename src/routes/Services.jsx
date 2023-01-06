import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Stack } from '@chakra-ui/react';

import ServiceCard from '../components/DataDisplay/ServiceCard';

import { useAuth } from '../context/authContext';
import { services as servicesApi } from '../services/services';

export default function Services() {
    const [services, setServices] = useState([]);
    const { tokens, user } = useAuth();

    useEffect(() => {
        servicesApi.getAll(tokens.accessToken).then((response) => {
            let { data } = response;

            if (user.role === 'MANAGER') {
                data = data.filter((service) => service.isActive);
            }

            setServices(data);
        });
    }, []);

    return (
        <Container maxWidth='container.xl'>
            <Stack spacing='4'>
                {user.role === 'ADMIN' && (
                    <ButtonGroup>
                        <Button>hello</Button>
                    </ButtonGroup>
                )}
                <Stack direction='column'>
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            service={service}
                            user={user}
                        />
                    ))}
                </Stack>
            </Stack>
        </Container>
    );
}
