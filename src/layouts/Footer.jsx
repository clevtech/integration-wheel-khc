import { useTranslation } from 'react-i18next';
import { IoLogoVk, IoLogoInstagram, IoLogoFacebook } from 'react-icons/io5';
import {
    Box,
    ButtonGroup,
    Container,
    Divider,
    IconButton,
    VStack,
    Stack,
    Text,
} from '@chakra-ui/react';

import { Baiterek } from '../assets/icons/Baiterek';
import { KazakhstanHousingCompany } from '../assets/icons/KazakhstanHousingCompany';

export default function Footer() {
    const { t } = useTranslation();

    const companyLinks = [
        {
            label: 'baiterek-icon-button',
            href: '',
            icon: <Baiterek />,
        },
        {
            label: 'khc-icon-button',
            href: '',
            icon: <KazakhstanHousingCompany />,
        },
    ];

    const socialLinks = [
        {
            label: 'facebook-icon-button',
            href: '',
            icon: <IoLogoFacebook />,
        },
        {
            label: 'instagram-icon-button',
            href: '',
            icon: <IoLogoInstagram />,
        },
        {
            label: 'vk-icon-button',
            href: '',
            icon: <IoLogoVk />,
        },
    ];

    return (
        <Box as='footer' background='brand.green.500'>
            <Container maxWidth='container.xl' color='white'>
                <Stack
                    align={{
                        base: 'flex-start',
                        sm: 'center',
                    }}
                    direction={{
                        base: 'column',
                        sm: 'row',
                    }}
                    justify='space-between'
                    py='6'
                >
                    <ButtonGroup spacing='3' variant='outline'>
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
                    <VStack align='flex-start'>
                        <Text>{t('layouts.footer.city')}</Text>
                        <Text>{t('layouts.footer.address')}</Text>
                    </VStack>
                    <VStack align='flex-start'>
                        <Text>+7 (7172) 79 75 75</Text>
                        <Text>info@khc.kz</Text>
                    </VStack>
                </Stack>
                <Divider />
                <Stack
                    align='center'
                    direction={{
                        base: 'column-reverse',
                        lg: 'row',
                    }}
                    justify='space-between'
                    py='6'
                >
                    <Text align='center'>&#169; 2004-{new Date().getFullYear()} {t('layouts.footer.copyright')}</Text>
                    <ButtonGroup spacing='3' variant='outline'>
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
