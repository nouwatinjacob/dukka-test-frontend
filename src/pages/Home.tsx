import { Flex, Heading, Text, Highlight, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpeechSynthesis } from 'react-speech-kit';

const headerText = 'Welcome to Speech-to-Text account creator.';
const subHeaderText = `Effortlessly create and manage your account using the power of speech!
        Experience seamless navigation, secure authentication, and a
        user-friendly interface in our innovative app.`;

const Home = () => {
  const [isRead, setAsRead] = useState(false);
  const onEnd = () => setAsRead(true);
  const { speak, supported, speaking, cancel } = useSpeechSynthesis({
    onEnd,
  });

  useEffect(() => {
    if (!supported || isRead) return;
    speak({
      text: headerText + ' ' + subHeaderText,
    });

    return () => {
      if (speaking) {
        cancel();
      }
    };
    // eslint-disable-next-line
  }, [supported, isRead, cancel]);

  return (
    <Flex
      gap={4}
      flexDir="column"
      pt={{ base: 50, md: 100, '2xl': 180 }}
      w={{ base: '100%', md: '60%' }}
      mx="auto"
      align="center"
      justify="center"
    >
      <Heading
        fontSize={{ base: '2xl', xl: '4xl' }}
        color="#2f2f2f"
        lineHeight={{ sm: 1.3, md: '120%', '2xl': '125%' }}
        fontWeight={500}
        textAlign="center"
      >
        <Highlight
          query="Speech-to-Text"
          styles={{
            rounded: 'full',
            color: 'purple.500',
          }}
        >
          {headerText}
        </Highlight>
      </Heading>
      <Text
        lineHeight="150%"
        color="#222222"
        fontSize={{ base: '14px', md: 'md' }}
        textAlign="center"
        fontWeight={500}
      >
        {subHeaderText}
      </Text>
      <Link to="/signup">
        <Button
          as="a"
          textDecoration="none"
          borderRadius="30px"
          colorScheme="purple"
          mt={4}
        >
          Get Started
        </Button>
      </Link>
    </Flex>
  );
};

export default Home;
