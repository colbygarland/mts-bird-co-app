import { Box, Center, Container, Image } from '@chakra-ui/react';
import { UserResponse } from '../components/UserResponse';
import { getData, UserResponseType } from '../lib/sheets';

export default function Home({ responses }: { responses: UserResponseType[] }) {
  return (
    <Container>
      <Center paddingTop="6">
        <Image src="logo.png" alt="Momma T's Bird Co." boxSize="260px" objectFit="cover" />
      </Center>
      <Box paddingTop="8">
        {responses.map((response) => (
          <UserResponse user={response} key={response.createdAt} />
        ))}
      </Box>
    </Container>
  );
}

export async function getStaticProps(_context: any) {
  const data = await getData();
  return {
    props: {
      responses: data ?? null,
    },
    revalidate: 1,
  };
}
