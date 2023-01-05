import { Box, useBreakpointValue } from '@chakra-ui/react';

export default function Layout({ children }) {
    return (
        <Box
            minHeight={useBreakpointValue({
                base: `calc(100vh - 84px - 369px)`,
                sm: `calc(100vh - 84px - 257px)`,
                md: `calc(100vh - 84px - 233px)`,
                lg: `calc(100vh - 84px - 201px)`,
            })}
            py={{ base: '12' }}
            background='brand.background'
        >
            {children}
        </Box>
    );
}
