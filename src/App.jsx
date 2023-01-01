import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import Footer from './layouts/Footer';
import Header from './layouts/Header';

const theme = extendTheme({
    colors: {
        yellowKhc: {
            100: '#D3B961',
            200: '#C9A11C',
        },
        greenKhc: {
            100: '#17794D',
            200: '#075431',
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
