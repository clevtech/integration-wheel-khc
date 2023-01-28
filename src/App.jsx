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
import Service from './routes/Service';
import Services from './routes/Services';
import Settings from './routes/Settings';
import SignIn from './routes/SignIn';
import Tokens from './routes/Tokens';
import Users from './routes/Users';
import ProtectedRoute from './utils/ProtectedRoute';
import i18n from './i18n/config';

import { AgreementProvider } from './context/agreementContext';
import { AuthProvider } from './context/authContext';
import { LanguageProvider } from './context/languageContext';
import { theme } from './lib/theme';

export default function App() {
    const [cookies] = useCookies(['language']);

    useEffect(() => {
        i18n.language !== cookies.language && i18n.changeLanguage(cookies.language);
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
                                            element={
                                                <ProtectedRoute>
                                                    <Analytics />
                                                </ProtectedRoute>
                                            }
                                        />
                                        <Route
                                            path='/history'
                                            element={
                                                <ProtectedRoute>
                                                    <History />
                                                </ProtectedRoute>
                                            }
                                        />
                                        <Route
                                            path='/services/create'
                                            element={
                                                <ProtectedRoute>
                                                    <Service />
                                                </ProtectedRoute>
                                            }
                                        />
                                        <Route
                                            path='/services'
                                            element={
                                                <ProtectedRoute>
                                                    <Services />
                                                </ProtectedRoute>
                                            }
                                        />
                                        <Route
                                            path='/settings'
                                            element={
                                                <ProtectedRoute>
                                                    <Settings />
                                                </ProtectedRoute>
                                            }
                                        />
                                        <Route path='/' element={<SignIn />} />
                                        <Route
                                            path='/tokens'
                                            element={
                                                <ProtectedRoute>
                                                    <Tokens />
                                                </ProtectedRoute>
                                            }
                                        />
                                        <Route
                                            path='/users'
                                            element={
                                                <ProtectedRoute>
                                                    <Users />
                                                </ProtectedRoute>
                                            }
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
