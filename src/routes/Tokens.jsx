import { useEffect, useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import {
    Badge,
    Card,
    CardBody,
    Button,
    ButtonGroup,
    Container,
    Heading,
    Stack,
    Text,
    useDisclosure,
} from '@chakra-ui/react';

import TokenCard from '../components/DataDisplay/TokenCard';
import CreateToken from '../components/Overlay/CreateToken';

import { useAuth } from '../context/authContext';
import { tokens as tokensApi } from '../services/tokens';

export default function Tokens() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { accessToken } = useAuth().tokens;
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        tokensApi.getAll(accessToken).then((res) => {
            setTokens(res.data);
        });
    }, []);

    return (
        <>
            <CreateToken isOpen={isOpen} onClose={onClose} />
            <Container maxW='container.xl'>
                <Stack spacing='4'>
                    <ButtonGroup justifyContent='flex-end'>
                        <Button
                            colorScheme='brand.yellow'
                            leftIcon={<IoAddCircleOutline />}
                            onClick={onOpen}
                        >
                            Создать новый ЭЦП
                        </Button>
                    </ButtonGroup>
                    <Stack>
                        {tokens.length > 0 ? (
                            tokens.map((token, index) => (
                                <TokenCard key={index} token={token} />
                            ))
                        ) : (
                            <Card variant='outline'>
                                <CardBody>
                                    <Text>Нет доступных ЭЦП</Text>
                                </CardBody>
                            </Card>
                        )}
                    </Stack>
                </Stack>
            </Container>
        </>
    );
}
