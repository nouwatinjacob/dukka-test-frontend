import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Link as ChakraLink,
  Text,
  HStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';

import { Link } from 'react-router-dom';
import schema from './schema';
import { User } from '../../../types/user';
import useSpeechToTextAuth from '../../hooks/useSpeechToTextAuth';
import PasswordInput from '../PasswordInput';
import PromptIcon from '../PromptIcon';

type FormProps = {
  onSave(values: User): void;
  loading?: boolean;
};

const fields: { [key: string]: string; name: keyof User }[] = [
  { label: 'Full name', name: 'full_name', type: 'text' },
  { label: 'Email address', name: 'email', type: 'text' },
  { label: 'Phone number', name: 'phone_number', type: 'text' },
  { label: 'Sex', name: 'sex', type: 'text' },
  { label: 'Country', name: 'country', type: 'text' },
  { label: 'Password', name: 'password', type: 'password' },
  {
    label: 'Confirm Password',
    name: 'confirm_password',
    type: 'password',
  },
];

const SignUpForm: React.FC<FormProps> = ({ onSave, loading }) => {
  const {
    setValue,
    register,
    handleSubmit: handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { speaking, startListening, currentInputName, getInputPlaceholder } =
    useSpeechToTextAuth({ saveFormValue: setValue });

  const onSubmit = (values: Record<string, string>) => onSave(values as User);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing="6"
        w={{ base: '95%', md: '600px' }}
        bg="white"
        p={8}
        shadow="base"
        borderRadius="md"
        mx="auto"
      >
        <Flex w="full" justify="space-between" align="center" mb={3}>
          <Heading as="h4" size="md" fontWeight={500}>
            Sign Up
          </Heading>
          <HStack spacing="1" justify="center">
            <Text color="muted">Already have an account?</Text>
            <ChakraLink
              color="purple.500"
              textDecoration="none"
              cursor="pointer"
              as={Link}
              to="/login"
            >
              Sign in
            </ChakraLink>
          </HStack>
        </Flex>

        <Flex
          w="full"
          flexDirection={{ base: 'column', lg: 'row' }}
          alignItems={{ base: 'center', sm: 'flex-start' }}
          columnGap={5}
        >
          <Stack flex={1} w={{ base: 'full', lg: '70%' }} spacing="3">
            {fields.map((field) => (
              <Flex
                key={field.name}
                gap={5}
                flexDir={{ base: 'column', md: 'row' }}
                justifyContent="space-between" // Added line to align items with space between them
              >
                <FormControl isInvalid={Boolean(errors[field.name])}>
                  <Flex align="center">
                    <FormLabel htmlFor={field.name}>{field.label}</FormLabel>{' '}
                    <PromptIcon
                      onClick={() => startListening(field.name)}
                      speaking={speaking && currentInputName === field.name}
                    />
                  </Flex>
                  {['password', 'confirm_password'].includes(field.type) ? (
                    <PasswordInput
                      id={field.name}
                      errorBorderColor="red.300"
                      {...register(field.name)}
                      placeholder={getInputPlaceholder(field.name, field.label)}
                    />
                  ) : (
                    <Input
                      id={field.name}
                      type={field.type}
                      {...register(field.name)}
                      placeholder={getInputPlaceholder(field.name, field.label)}
                      errorBorderColor="red.300"
                    />
                  )}
                  <FormErrorMessage>
                    {errors?.[field.name]?.message &&
                      // @ts-ignore: typescript error
                      errors[field.name].message.toString()}
                  </FormErrorMessage>
                </FormControl>
              </Flex>
            ))}
          </Stack>
        </Flex>

        <Stack spacing="1" direction="row">
          <Button type="submit" colorScheme="purple" isLoading={loading}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default SignUpForm;
