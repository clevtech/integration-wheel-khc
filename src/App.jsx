import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import Footer from './layouts/Footer';
import Header from './layouts/Header';

import Login from './routes/Login';

const theme = extendTheme({
    colors: {
        brand: {
            yellow: {
                50: '#fbf8ef',
                100: '#f1e9ce',
                200: '#ebdfb6',
                300: '#e2d095',
                400: '#dcc781',
                500: '#d3b961',
                600: '#c0a858',
                700: '#968345',
                800: '#746635',
                900: '#594e29',
            },
            green: {
                50: '#e8f2ed',
                100: '#b7d5c8',
                200: '#94c1ad',
                300: '#64a588',
                400: '#459471',
                500: '#17794d',
                600: '#156e46',
                700: '#105637',
                800: '#0d432a',
                900: '#0a3320',
            },
        },
    },
});

export default function App() {
    return (
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <Header />
                <Routes>
                    <Route path='/' element={<Login />} />
                </Routes>
                <Footer />
            </ChakraProvider>
        </BrowserRouter>
    );
}
