import { Box, Checkbox, Heading, Text } from '@chakra-ui/react';
import { UserResponseType } from '../lib/sheets';

interface UserResponseProps {
  user: UserResponseType;
}

export const UserResponse = ({ user }: UserResponseProps) => {
  return (
    <Box paddingBottom="10">
      <Heading>{user.name}</Heading>
      <Text color="grey" textDecoration="underline">
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </Text>
      <Text>
        <strong>{user.quantity}</strong> chicks on order
      </Text>
      <Text>
        Preferred order date: <strong>{user.orderDate}</strong>
      </Text>
      <Checkbox>Deposit has been sent</Checkbox>
    </Box>
  );
};
