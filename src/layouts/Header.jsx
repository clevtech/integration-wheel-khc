import {
    IoChevronDownOutline,
    IoExitOutline,
    IoListOutline,
    IoPersonOutline,
    IoSettingsOutline,
} from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Button,
    Container,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList,
    Spacer,
    Stack,
    Text,
    useDisclosure,
} from '@chakra-ui/react';

import { KazakhstanHousingCompany } from '../assets/icons/KazakhstanHousingCompany';
import { useAuth } from '../context/authContext';
import { useLanguage } from '../context/languageContext';

export default function Header() {
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();

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

    let navLinks = [
        {
            label: 'Сервисы',
            path: '/services',
        },
        {
            label: 'История запросов',
            path: '/history',
        },
    ];

    if (user && user.role === 'ADMIN') {
        navLinks = [
            ...navLinks,
            {
                label: 'Аналитика',
                path: '/analytics',
            },
            {
                label: 'Пользователи',
                path: '/users',
            },
            {
                label: 'ЭЦП и токены',
                path: '/tokens',
            },
        ];
    }

    const handleLanguageChange = (value) => {
        handleLanguage(value);
        i18n.changeLanguage(value);
    };

    return (
        <>
            <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader />
                    <DrawerBody>
                        <Stack
                            align='flex-start'
                            direction='column'
                            spacing='6'
                        >
                            {navLinks.map((navLink, index) => (
                                <Button
                                    key={index}
                                    colorScheme='brand.green'
                                    variant='link'
                                >
                                    <Link to={navLink.path}>
                                        {navLink.label}
                                    </Link>
                                </Button>
                            ))}
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Box as='header' boxShadow='md'>
                <Container
                    maxWidth='100%'
                    height='12px'
                    background='brand.green.500'
                />
                <Container maxWidth='container.xl'>
                    <Flex alignItems='center' paddingY='16px'>
                        {user ? (
                            <IconButton
                                icon={<IoListOutline />}
                                onClick={onOpen}
                            />
                        ) : (
                            <IconButton
                                as='a'
                                href=''
                                icon={
                                    <KazakhstanHousingCompany color='brand.green.500' />
                                }
                                variant='link'
                            />
                        )}
                        <Spacer />
                        <Flex gap='2'>
                            <Menu isLazy>
                                <MenuButton
                                    as={Button}
                                    colorScheme='brand.yellow'
                                    rightIcon={<IoChevronDownOutline />}
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
                                        icon={<IoPersonOutline />}
                                    />
                                    <MenuList>
                                        <MenuGroup
                                            title={`${user.lastName} ${user.firstName}`}
                                        >
                                            <MenuItem
                                                as='button'
                                                icon={<IoSettingsOutline />}
                                                onClick={() =>
                                                    navigate('/settings')
                                                }
                                            >
                                                Настройки
                                            </MenuItem>
                                            <MenuItem
                                                icon={<IoExitOutline />}
                                                onClick={handleSignOut}
                                            >
                                                <Text>Выйти</Text>
                                            </MenuItem>
                                        </MenuGroup>
                                    </MenuList>
                                </Menu>
                            )}
                        </Flex>
                    </Flex>
                </Container>
            </Box>
        </>
    );
}
