import { useEffect, useState } from 'react';
import { IoCheckmarkOutline, IoContractOutline, IoExpandOutline, IoTrashOutline } from 'react-icons/io5';
import { Avatar, Button, ButtonGroup, Card, CardBody, Divider, Heading, Stack, Text, VStack } from '@chakra-ui/react';

import UserServicesCard from './UserServicesCard';

import { useAuth } from '../../context/authContext';
import { services as servicesApi } from '../../services/services';
import { users as usersApi } from '../../services/users';

export default function UserCard({ user }) {
  const { tokens } = useAuth();

  const [isExpanded, setIsExpanded] = useState(false);
  const [services, setServices] = useState([]);

  const handleDelete = () => {
    usersApi.deleteByUserId(tokens.accessToken, user.id);
  };

  useEffect(() => {
    servicesApi.getByUserId(tokens.accessToken, user.id).then((response) => {
      let { data } = response;

      setServices(data);
    });
  }, []);

  return (
    <Card variant='outline' width='100%' background='white'>
      <CardBody>
        <Stack gap='4'>
          <Stack
            align={{
              base: 'flex-start',
              sm: 'center',
            }}
            direction={{
              base: 'column',
              sm: 'row',
            }}
            justify='space-between'
            spacing={{
              base: '4',
              sm: '0',
            }}
          >
            <Stack align='center' direction='row' spacing='4'>
              <Avatar />
              <VStack align='flex-start' spacing='-0.5'>
                <Text as='b'>{`${user.lastName} ${user.firstName}`}</Text>
                <Text>{user.role.name === 'MANAGER' ? 'Менеджер' : 'Администратор'}</Text>
              </VStack>
            </Stack>
            <Button
              colorScheme='brand.yellow'
              rightIcon={isExpanded ? <IoContractOutline /> : <IoExpandOutline />}
              onClick={() => {
                setIsExpanded(!isExpanded);
              }}
              width={{
                base: '100%',
                sm: 'auto',
              }}
            >
              {isExpanded ? 'Свернуть' : 'Подробнее'}
            </Button>
          </Stack>
          {isExpanded && (
            <>
              <Divider />
              <Heading size='md'>Разрешенные сервисы</Heading>
              <Card variant='outline'>
                <CardBody>
                  <Stack spacing='4'>
                    {services.map((service, index) => (
                      <UserServicesCard key={index} service={service} user={user} />
                    ))}
                  </Stack>
                </CardBody>
              </Card>
              <ButtonGroup justifyContent='flex-end'>
                {!user.isActivated && (
                  <Button colorScheme='brand.green' leftIcon={<IoCheckmarkOutline />} onClick={handleApprove}>
                    Подтвердить
                  </Button>
                )}
                <Button colorScheme='brand.red' leftIcon={<IoTrashOutline />} onClick={handleDelete}>
                  Удалить
                </Button>
              </ButtonGroup>
            </>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}
