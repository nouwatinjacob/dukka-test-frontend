import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';

import { Link } from 'react-router-dom';
import * as yup from 'yup';
import PasswordInput from './PasswordInput';
import PromptIcon from './PromptIcon';
import useSpeechToTextAuth from '../hooks/useSpeechToTextAuth';

export type FormValues = {
  email: string;
  password: string;
};

type FormProps = {
  onSave(values: FormValues): void;
  loading?: boolean;
};

const fields: { [key: string]: string; name: keyof FormValues }[] = [
  { label: 'Email address', name: 'email', type: 'text' },
  { label: 'Password', name: 'password', type: 'password' },
];

const schema = yup
  .object({
    email: yup
      .string()
      .email('Please enter your email address')
      .required('Your email address is required'),
    password: yup
      .string()
      .required('Enter your password')
      .min(6, 'Password must be at least 6 characters'),
  })
  .required();

const LoginForm: React.FC<FormProps> = ({ onSave, loading }) => {
  const {
    setValue,
    register,
    handleSubmit: handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    speaking,
    startListening,
    currentInputName,
    getInputPlaceholder,
    listening,
  } = useSpeechToTextAuth({ saveFormValue: setValue });

  const onSubmit = (values: Record<string, unknown>) =>
    onSave(values as FormValues);

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
            Sign in
          </Heading>
          <HStack spacing="1" justify="center">
            <Text color="muted">Don't have an account?</Text>
            <ChakraLink
              as={Link}
              to="/signup"
              color="purple.500"
              textDecoration="none"
              cursor="pointer"
            >
              Get one
            </ChakraLink>
          </HStack>
        </Flex>
        <Flex
          w="full"
          flexDirection={{ base: 'column', lg: 'row' }}
          alignItems={{ base: 'center', sm: 'flex-start' }}
          columnGap={5}
        >
          <Stack flex={1} w={{ base: 'full', lg: '70%' }} spacing="5">
            {fields.map((field) => (
              <Flex
                key={field.name}
                gap={5}
                flexDir={{ base: 'column', md: 'row' }}
              >
                <FormControl isInvalid={Boolean(errors[field.name])}>
                  <Flex align="center">
                    <FormLabel htmlFor={field.name}>{field.label}</FormLabel>{' '}
                    <PromptIcon
                      onClick={() => startListening(field.name)}
                      speaking={speaking && currentInputName === field.name}
                    />
                  </Flex>
                  {field.type === 'password' ? (
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

export default LoginForm;
