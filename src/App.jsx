import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Agreement from './components/Overlay/Agreement';
import Layout from './layouts';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';
import i18n from './i18n/config';

import { AgreementProvider } from './context/agreementContext';
import { LanguageProvider } from './context/languageContext';
import { theme } from './lib/theme';

export default function App() {
    const [cookies] = useCookies(['language']);

    useEffect(() => {
        i18n.language !== cookies.language &&
            i18n.changeLanguage(cookies.language);
    }),
        [];

    return (
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <I18nextProvider i18n={i18n}>
                    <LanguageProvider>
                        <AgreementProvider>
                            <Agreement />
                            <Header />
                            <Layout>
                                <Routes>
                                    <Route path='/' element={<SignIn />} />
                                    <Route
                                        path='/sign-up'
                                        element={<SignUp />}
                                    />
                                </Routes>
                            </Layout>
                            <Footer />
                        </AgreementProvider>
                    </LanguageProvider>
                </I18nextProvider>
            </ChakraProvider>
        </BrowserRouter>
    );
}
