import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import Footer from './layouts/Footer';
import Header from './layouts/Header';

import Login from './routes/Login';

const theme = extendTheme({
    colors: {
        brand: {
            yellow: '#D3B961',
            green: '#17794D',
            hover: {
                yellow: '#C9A11C',
                green: '#075431',
            },
        },
    },
});

export default function App() {
    return (
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <Header />
                <Routes></Routes>
                <Footer />
            </ChakraProvider>
        </BrowserRouter>
    );
}
