import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        brand: {
            background: '#f8fafc',
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
            red: {
                50: '#fbefef',
                100: '#f1cece',
                200: '#eab6b6',
                300: '#e19494',
                400: '#db8080',
                500: '#d26060',
                600: '#bf5757',
                700: '#954444',
                800: '#743535',
                900: '#582828',
            },
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
        },
    },
});

export { theme };
