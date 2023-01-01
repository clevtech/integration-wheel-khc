import { useCallback, useState } from 'react';

import {
    Button,
    Center,
    Container,
    Flex,
    Link as ChakraUILink,
    Menu,
    MenuButton,
    MenuList,
    Spacer,
    Text,
} from '@chakra-ui/react';
import { BiDownArrowAlt } from 'react-icons/bi';

import CustomizedMenuItem from '../../components/Header/CustomizedMenuItem';

import { KazakhstanHousingCompany } from '../../assets/icons/KazakhstanHousingCompany';

export default function Header() {
    const languages = ['KZ', 'EN', 'RU'];

    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

    return (
        <Container maxWidth='100%' padding='0'>
            <Container
                maxWidth='100%'
                height='12px'
                background='greenKhc.100'
            />
            <Container maxWidth='container.xl'>
                <Flex alignItems='center'>
                    <Center width='60px' height='60px'>
                        <ChakraUILink href='https://khc.kz/' isExternal>
                            <KazakhstanHousingCompany color='greenKhc.100' />
                        </ChakraUILink>
                    </Center>
                    <Spacer />
                    <Menu isLazy>
                        <MenuButton
                            as={Button}
                            rightIcon={<BiDownArrowAlt />}
                            color='white'
                            background='yellowKhc.100'
                            transition='all 0.5s'
                            _hover={{ background: 'yellowKhc.200' }}
                            _expanded={{ background: 'yellowKhc.200' }}
                            _focus={{ background: 'yellowKhc.200' }}
                        >
                            <Text as='b'>{selectedLanguage}</Text>
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
        </Container>
    );
}
