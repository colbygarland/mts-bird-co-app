import { Box, Button, Checkbox, Flex, Heading, Text } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { UserResponseType } from '../lib/sheets';
import axios from 'axios';

interface UserResponseProps {
  user: UserResponseType;
}

export const UserResponse = ({ user }: UserResponseProps) => {
  console.log(user);
  const [checked, setChecked] = useState(user.depositPaid === '1');
  const [emailSent, setEmailSent] = useState(user.emailSent === '1');

  const subject = `Momma T's Bird Co. Order Details`;
  const message = `${user.name}, Thank you for your order! We have received your order for ${user.quantity} chicks, and your order date is ${user.orderDate}.`;
  const emailLink = `mailto:${user.email}?subject=${subject}&body=${message}`;

  const handleCheckboxOnChange = (_event: ChangeEvent<HTMLInputElement>) => {
    setChecked(true);
    axios
      .post('https://add-netlify-function--mts-bird-co.netlify.app/.netlify/functions/update-google-sheet', {
        cell: 'Q2',
        data: '1',
      })
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <Box paddingBottom="10">
      <Heading color="purple.400">{user.name}</Heading>
      <Text color="grey" textDecoration="underline">
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </Text>
      <Text>
        <strong>{user.quantity}</strong> chicks on order
      </Text>
      <Text>
        Preferred order date: <strong>{user.orderDate}</strong>
      </Text>
      <Checkbox colorScheme="purple" isChecked={checked} isReadOnly={checked} onChange={handleCheckboxOnChange}>
        Deposit has been sent
      </Checkbox>

      {checked && (
        <Box paddingTop="4">
          <Flex alignItems="center">
            <Button size="sm" colorScheme="purple" as="a" href={emailLink} target="_blank" disabled={emailSent}>
              Send Email
            </Button>
            {emailSent && (
              <Text paddingLeft="3" color="grey">
                You have already sent the email.
              </Text>
            )}
          </Flex>
        </Box>
      )}
    </Box>
  );
};
