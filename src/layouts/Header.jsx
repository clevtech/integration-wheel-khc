import { IoChevronDownOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Avatar,
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

import { KazakhstanHousingCompany } from '../assets/icons/KazakhstanHousingCompany';
import { useAuth } from '../context/authContext';
import { useLanguage } from '../context/languageContext';

export default function Header() {
    const { i18n } = useTranslation();

    const { user, handleSignOut } = useAuth();
    const { language, handleLanguage } = useLanguage();

    const menuItems = [
        {
            label: 'Қазақша',
            value: 'kz',
        },
        {
            label: 'Русский',
            value: 'ru',
        },
    ];

    const handleLanguageChange = (value) => {
        handleLanguage(value);
        i18n.changeLanguage(value);
    };

    return (
        <Box as='header' boxShadow='md'>
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
                    <Flex gap='2'>
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
                                        onClick={() => {
                                            handleLanguageChange(
                                                menuItem.value
                                            );
                                        }}
                                    >
                                        <Text>{menuItem.label}</Text>
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </Menu>
                        {user && (
                            <Menu isLazy>
                                <MenuButton
                                    as={IconButton}
                                    transition='all 0.5s'
                                    icon={
                                        <Avatar
                                            name='Yeren Kalibek'
                                            background='brand.green.500'
                                        />
                                    }
                                    isRound
                                />
                                <MenuList>
                                    <MenuItem>
                                        <Link to='settings'>Настройки</Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleSignOut}>
                                        <Text>Выйти</Text>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        )}
                    </Flex>
                </Flex>
            </Container>
        </Box>
    );
}
