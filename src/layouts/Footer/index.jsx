import {
    Box,
    ButtonGroup,
    Container,
    Divider,
    IconButton,
    Stack,
    Text,
} from '@chakra-ui/react';
import { IoLogoVk, IoLogoInstagram, IoLogoFacebook } from 'react-icons/io5';

import Cookies from '../../components/Overlay/Cookies';
import { Baiterek } from '../../assets/icons/Baiterek';
import { KazakhstanHousingCompany } from '../../assets/icons/KazakhstanHousingCompany';

export default function Footer() {
    const companyLinks = [
        {
            label: 'baiterek-icon-button',
            href: 'https://baiterek.gov.kz/',
            icon: <Baiterek />,
        },
        {
            label: 'khc-icon-button',
            href: 'https://khc.kz/',
            icon: <KazakhstanHousingCompany />,
        },
    ];

    const socialLinks = [
        {
            label: 'facebook-icon-button',
            href: 'https://facebook.com/khc.kz/',
            icon: <IoLogoFacebook />,
        },
        {
            label: 'instagram-icon-button',
            href: 'https://instagram.com/khc.kz/',
            icon: <IoLogoInstagram />,
        },
        {
            label: 'vk-icon-button',
            href: 'https://vk.com/khc_kz',
            icon: <IoLogoVk />,
        },
    ];

    return (
        <Box as='footer' maxWidth='100%' background='brand.green.500'>
            <Cookies />
            <Container maxWidth='container.xl' color='white'>
                <Stack
                    direction={{
                        base: 'column',
                        sm: 'row',
                    }}
                    justify='space-between'
                    spacing='24px'
                    py='24px'
                >
                    <ButtonGroup spacing='24px' variant='outline'>
                        {companyLinks.map((link, index) => (
                            <IconButton
                                key={index}
                                as='a'
                                href={link.href}
                                aria-label={link.label}
                                icon={link.icon}
                                variant='ghost'
                                _focus={{ background: 'none' }}
                                _hover={{ background: 'none' }}
                            />
                        ))}
                    </ButtonGroup>
                    <Text>
                        г. Астана <br /> пр. Мәңгілік Ел, 55А
                    </Text>
                    <Text>
                        +7 (7172) 79 75 75 <br /> info@khc.kz
                    </Text>
                </Stack>
                <Divider />
                <Stack
                    align='center'
                    direction={{
                        base: 'column-reverse',
                        lg: 'row',
                    }}
                    justify='space-between'
                    py='24px'
                >
                    <Text align='center'>
                        &copy; 2004-{new Date().getFullYear()} AO «Казахстанская
                        Жилищная Компания», дочерняя организация АО «НУХ
                        «Байтерек»​
                    </Text>
                    <ButtonGroup spacing='8px' variant='outline'>
                        {socialLinks.map((link, index) => (
                            <IconButton
                                key={index}
                                as='a'
                                href={link.href}
                                aria-label={link.label}
                                icon={link.icon}
                                size='lg'
                                variant='ghost'
                                _focus={{
                                    background: 'brand.yellow.600',
                                    border: 'none',
                                }}
                                _hover={{
                                    background: 'brand.yellow.600',
                                    border: 'none',
                                }}
                            />
                        ))}
                    </ButtonGroup>
                </Stack>
            </Container>
        </Box>
    );
}
