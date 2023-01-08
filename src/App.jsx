import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Agreement from './components/Overlay/Agreement';
import Layout from './layouts';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import Analytics from './routes/Analytics';
import History from './routes/History';
import Services from './routes/Services';
import Settings from './routes/Settings';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';
import Tokens from './routes/Tokens';
import Users from './routes/Users';
import i18n from './i18n/config';

import { AgreementProvider } from './context/agreementContext';
import { AuthProvider } from './context/authContext';
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
                            <AuthProvider>
                                <Agreement />
                                <Header />
                                <Layout>
                                    <Routes>
                                        <Route
                                            path='/analytics'
                                            element={<Analytics />}
                                        />
                                        <Route
                                            path='/history'
                                            element={<History />}
                                        />
                                        <Route
                                            path='/services'
                                            element={<Services />}
                                        />
                                        <Route
                                            path='/settings'
                                            element={<Settings />}
                                        />
                                        <Route path='/' element={<SignIn />} />
                                        <Route
                                            path='/sign-up'
                                            element={<SignUp />}
                                        />
                                        <Route
                                            path='/tokens'
                                            element={<Tokens />}
                                        />
                                        <Route
                                            path='/users'
                                            element={<Users />}
                                        />
                                    </Routes>
                                </Layout>
                                <Footer />
                            </AuthProvider>
                        </AgreementProvider>
                    </LanguageProvider>
                </I18nextProvider>
            </ChakraProvider>
        </BrowserRouter>
    );
}
