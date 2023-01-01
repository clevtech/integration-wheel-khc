import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Header from './components/Header';

export default function App() {
    return (
        <BrowserRouter>
            <ChakraProvider>
                <Header />
                <Routes></Routes>
            </ChakraProvider>
        </BrowserRouter>
    );
}
