import { useEffect, useState } from 'react';
import { Button, Container, Stack, useDisclosure } from '@chakra-ui/react';

import ServiceCard from '../components/DataDisplay/ServiceCard';
import CreateProvider from '../components/Overlay/CreateProvider';

import { useAuth } from '../context/authContext';
import { services as servicesApi } from '../services/services';

export default function Services() {
    const { tokens, user } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [services, setServices] = useState([]);

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
        <>
            <CreateProvider isOpen={isOpen} onClose={onClose} />
            <Container maxWidth='container.xl'>
                <Stack spacing='4'>
                    {user.role === 'ADMIN' && (
                        <Stack
                            direction={{
                                base: 'column',
                                md: 'row',
                            }}
                        >
                            <Button colorScheme='brand.yellow' onClick={onOpen}>
                                Добавить провайдер
                            </Button>
                            <Button colorScheme='brand.yellow'>
                                Добавить сервис
                            </Button>
                        </Stack>
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
        </>
    );
}
