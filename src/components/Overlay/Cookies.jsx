import { useState } from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalContent,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';

import { useAgreement } from '../../context/agreementContext';

export default function Cookies() {
    const { isAgreed, handleAgreement } = useAgreement();

    const [isOpen, setIsOpen] = useState(isAgreed ? false : true);


    const onClose = () => {
        setIsOpen(false);

        handleAgreement();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Мы используем cookie</ModalHeader>
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
