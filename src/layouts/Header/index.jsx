import { useState } from 'react';

import {
    Box,
    Button,
    Container,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    Spacer,
    Text,
} from '@chakra-ui/react';
import { FaLanguage } from 'react-icons/fa';

import CustomizedMenuItem from '../../components/Header/CustomizedMenuItem';

import { KazakhstanHousingCompany } from '../../assets/icons/KazakhstanHousingCompany';

export default function Header() {
    const languages = ['KZ', 'EN', 'RU'];

    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

    return (
        <Box as='header'>
            <Container maxWidth='100%' height='12px' background='brand.green' />
            <Container maxWidth='container.xl'>
                <Flex alignItems='center' paddingY='16px'>
                    <IconButton
                        as='a'
                        href='https://khc.kz/'
                        aria-label='khc-icon-button'
                        icon={<KazakhstanHousingCompany color='brand.green' />}
                        variant='ghost'
                        _hover={{ background: 'none' }}
                        _focus={{ background: 'none' }}
                    />
                    <Spacer />
                    <Menu isLazy>
                        <MenuButton
                            as={Button}
                            rightIcon={<FaLanguage />}
                            color='white'
                            background='brand.yellow'
                            transition='all 0.5s'
                            _hover={{ background: 'brand.hover.yellow' }}
                            _expanded={{ background: 'brand.hover.yellow' }}
                            _focus={{ background: 'brand.hover.yellow' }}
                        >
                            <Text>{selectedLanguage}</Text>
                        </MenuButton>
                        <MenuList>
                            {languages.map((language, index) => (
                                <CustomizedMenuItem
                                    key={index}
                                    language={language}
                                    onClick={setSelectedLanguage}
                                />
                            ))}
                        </MenuList>
                    </Menu>
                </Flex>
            </Container>
        </Box>
    );
}
