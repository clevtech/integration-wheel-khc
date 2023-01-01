import { Button, Container, Text } from '@chakra-ui/react';

export default function Header() {
    return (
        <Container maxWidth='100%' background='green.600'>
            <Container maxWidth='container.xl'>
                <Text fontSize='4xl' color='white'>
                    Hello World
                </Text>
            </Container>
        </Container>
    );
}
