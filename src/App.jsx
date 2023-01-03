import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Footer from './layouts/Footer';
import Header from './layouts/Header';

import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';

import { LanguageProvider } from './context/languageContext';
import { theme } from './lib/theme';

export default function App() {
    return (
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <LanguageProvider>
                    <Header />
                    <Routes>
                        <Route path='/' element={<SignIn />} />
                        <Route path='/sign-up' element={<SignUp />} />
                    </Routes>
                    <Footer />
                </LanguageProvider>
            </ChakraProvider>
        </BrowserRouter>
    );
}
