import { useState } from 'react';
import { Badge, Checkbox, Stack, Text } from '@chakra-ui/react';

import { useAuth } from '../../context/authContext';
import { services as servicesApi } from '../../services/services';

export default function UserServicesCard({ service, user }) {
    const { tokens } = useAuth();

    const [isChecked, setIsChecked] = useState(service.isPermitted);

    const handleChange = () => {
        setIsChecked(!isChecked);

        if (isChecked) {
            servicesApi.denyByUserId(tokens.accessToken, {
                userId: user.id,
                providerRequestId: service.id,
            });
        } else {
            servicesApi.permitByUserId(tokens.accessToken, {
                userId: user.id,
                providerRequestId: service.id,
            });
        }
    };

    return (
        <Checkbox
            colorScheme='brand.yellow'
            defaultChecked={isChecked}
            onChange={handleChange}
        >
            <Stack
                align={{
                    base: 'flex-start',
                    sm: 'center',
                }}
                direction={{
                    base: 'column',
                    sm: 'row',
                }}
                spacing={{
                    base: '0',
                    sm: '2',
                }}
            >
                <Text>{service.name}</Text>
                {!service.isActive && (
                    <Badge colorScheme='brand.yellow'>Архивный</Badge>
                )}
            </Stack>
        </Checkbox>
    );
}
