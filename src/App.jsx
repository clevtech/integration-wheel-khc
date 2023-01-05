import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Agreement from './components/Overlay/Agreement';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';

import { AgreementProvider } from './context/agreementContext';
import { LanguageProvider } from './context/languageContext';
import { theme } from './lib/theme';

export default function App() {
    return (
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <LanguageProvider>
                    <AgreementProvider>
                        <Agreement />
                        <Header />
                        <Routes>
                            <Route path='/' element={<SignIn />} />
                            <Route path='/sign-up' element={<SignUp />} />
                        </Routes>
                        <Footer />
                    </AgreementProvider>
                </LanguageProvider>
            </ChakraProvider>
        </BrowserRouter>
    );
}
