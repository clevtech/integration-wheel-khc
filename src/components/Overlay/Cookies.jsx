import { useEffect } from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    useDisclosure,
} from '@chakra-ui/react';

export default function Cookies() {
    const { isOpen, onOpen, onClose } = useDisclosure(true);

    useEffect(() => {
        onOpen();
    }, []);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Мы используем cookie</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>
                        Наш сайт использует файлы cookie чтобы предоставлять
                        услуги, наиболее отвечающие вашим потребностям, а также
                        накапливать статистическую информацию для анализа и
                        улучшения наших услуг
                    </Text>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color='white'
                        background='brand.yellow.500'
                        onClick={onClose}
                        _hover={{ background: 'brand.yellow.600' }}
                        _focus={{ background: 'brand.yellow.600' }}
                    >
                        ОК
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
