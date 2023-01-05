import { Box, useBreakpointValue } from '@chakra-ui/react';

export default function Layout({ children }) {
    return (
        <Box
            minHeight={useBreakpointValue({
                base: `calc(100vh - 84px - 385px)`,
                sm: `calc(100vh - 84px - 249px)`,
                md: `calc(100vh - 84px - 225px)`,
                lg: `calc(100vh - 84px - 193px)`,
            })}
            py={{ base: '12' }}
            background='brand.background'
        >
            {children}
        </Box>
    );
}
