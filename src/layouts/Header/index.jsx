import { useEffect, useState } from 'react';

import {
    Button,
    Center,
    Container,
    Flex,
    Link as ChakraUILink,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Text,
} from '@chakra-ui/react';
import { BiDownArrowAlt } from 'react-icons/bi';

import { KazakhstanHousingCompany } from '../../assets/icons/KazakhstanHousingCompany';

export default function Header() {
    const [selectedLanguage, setSelectedLanguage] = useState('KZ');

    return (
        <Container maxWidth='100%' padding='0'>
            <Container maxWidth='100%' height='12px' background='green.600' />
            <Container maxWidth='container.xl'>
                <Flex alignItems='center'>
                    <Center width='60px' height='60px'>
                        <ChakraUILink href='https://khc.kz/' isExternal>
                            <KazakhstanHousingCompany color='green.600' />
                        </ChakraUILink>
                    </Center>
                    <Spacer />
                    <Menu>
                        <MenuButton
                            as={Button}
                            colorScheme='yellow'
                            rightIcon={<BiDownArrowAlt />}
                        >
                            <Text>{selectedLanguage}</Text>
                        </MenuButton>
                        <MenuList>
                            <MenuItem
                                value={'KZ'}
                                onClick={(e) =>
                                    setSelectedLanguage(e.target.value)
                                }
                            >
                                KZ
                            </MenuItem>
                            <MenuItem
                                value={'RU'}
                                onClick={(e) =>
                                    setSelectedLanguage(e.target.value)
                                }
                            >
                                RU
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Container>
        </Container>
    );
}
