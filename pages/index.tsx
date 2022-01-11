import { Center, Container, Image } from '@chakra-ui/react';

export default function Home() {
  return (
    <Container>
      <Center paddingTop="6">
        <Image src="logo.png" alt="Momma T's Bird Co." boxSize="260px" objectFit="cover" />
      </Center>
    </Container>
  );
}
