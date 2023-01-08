import { useState } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
} from '@chakra-ui/react';

import { useAuth } from '../../context/authContext';
import { providers as providersApi } from '../../services/providers';

export default function CreateProvider({ isOpen, onClose }) {
    const { tokens } = useAuth();

    const [name, setName] = useState('');

    const handleSubmit = () => {
        providersApi.create(tokens.accessToken, {
            name: name,
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Новый провайдер</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Название провайдера</FormLabel>
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Stack direction='row'>
                        <Button onClick={onClose}>Отмена</Button>
                        <Button colorScheme='brand.yellow' onClick={handleSubmit}>
                            Создать
                        </Button>
                    </Stack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
