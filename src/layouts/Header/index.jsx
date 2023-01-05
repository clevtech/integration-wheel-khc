import { useEffect } from 'react';
import {
    Box,
    Button,
    Container,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Text,
} from '@chakra-ui/react';
import { IoChevronDownOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';

import { KazakhstanHousingCompany } from '../../assets/icons/KazakhstanHousingCompany';
import { useLanguage } from '../../context/languageContext';

export default function Header() {
    const { i18n } = useTranslation();

    const { language, handleLanguage } = useLanguage();

    const menuItems = [
        {
            label: 'Қазақша',
            value: 'kz',
        },
        {
            label: 'English',
            value: 'en',
        },
        {
            label: 'Русский',
            value: 'ru',
        },
    ];

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language]);

    return (
        <Box as='header'>
            <Container
                maxWidth='100%'
                height='12px'
                background='brand.green.500'
            />
            <Container maxWidth='container.xl'>
                <Flex alignItems='center' paddingY='16px'>
                    <IconButton
                        as='a'
                        href='https://khc.kz/'
                        aria-label='khc-icon-button'
                        icon={
                            <KazakhstanHousingCompany color='brand.green.500' />
                        }
                        variant='ghost'
                        _hover={{ background: 'none' }}
                        _focus={{ background: 'none' }}
                    />
                    <Spacer />
                    <Menu isLazy>
                        <MenuButton
                            as={Button}
                            color='white'
                            background='brand.yellow.500'
                            transition='all 0.5s'
                            rightIcon={<IoChevronDownOutline />}
                            _hover={{ background: 'brand.yellow.600' }}
                            _expanded={{ background: 'brand.yellow.600' }}
                            _focus={{ background: 'brand.yellow.600' }}
                        >
                            <Text>{language.toUpperCase()}</Text>
                        </MenuButton>
                        <MenuList>
                            {menuItems.map((menuItem, index) => (
                                <MenuItem
                                    key={index}
                                    value={menuItem.value}
                                    onClick={(e) => {
                                        handleLanguage(e.target.value);
                                    }}
                                >
                                    <Text>{menuItem.label}</Text>
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                </Flex>
            </Container>
        </Box>
    );
}
