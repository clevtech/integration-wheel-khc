import { useEffect, useState } from 'react';
import { IoAddCircleOutline, IoBagAddOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Stack, useDisclosure } from '@chakra-ui/react';

import ServiceCard from '../components/DataDisplay/ServiceCard';
import CreateProvider from '../components/Overlay/CreateProvider';

import { useAuth } from '../context/authContext';
import { services as servicesApi } from '../services/services';

export default function Services() {
    const navigate = useNavigate();

    const { tokens, user } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [services, setServices] = useState([]);

    useEffect(() => {
        servicesApi.getAll(tokens.accessToken).then((response) => {
            let { data } = response;

            data = data.sort((a, b) => {
                if (a.isActive && !b.isActive) {
                    return -1;
                } else if (!a.isActive && b.isActive) {
                    return 1;
                } else {
                    return 0;
                }
            });

            if (user.role === 'MANAGER') {
                data = data.filter((service) => service.isPermitted);
            }

            setServices(data);
        });
    }, []);

    const actions = {
        onDelete: (id) => {
            setServices((prev) => prev.filter((service) => service.id !== id));
        },

        onDuplicate: (id) => {
            setServices((prev) => {
                const service = prev.find((service) => service.id === id);
                const newService = { ...service, id: null };

                return [...prev, newService];
            });
        }
    };

    return (
        <>
            <CreateProvider isOpen={isOpen} onClose={onClose} />
            <Container maxWidth='container.xl'>
                <Stack spacing='4'>
                    {user.role === 'ADMIN' && (
                        <Stack
                            direction={{
                                base: 'column',
                                sm: 'row',
                            }}
                            justify='flex-end'
                        >
                            <Button colorScheme='brand.yellow' leftIcon={<IoBagAddOutline />} onClick={onOpen}>
                                Добавить провайдер
                            </Button>
                            <Button
                                colorScheme='brand.yellow'
                                leftIcon={<IoAddCircleOutline />}
                                onClick={() => navigate('create')}
                            >
                                Добавить сервис
                            </Button>
                        </Stack>
                    )}
                    <Stack direction='column'>
                        {services.map((service, index) => (
                            <ServiceCard key={index} service={service} user={user} actions={actions} />
                        ))}
                    </Stack>
                </Stack>
            </Container>
        </>
    );
}
