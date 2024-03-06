import { Flex, Heading, Text, Highlight, Skeleton } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
// @ts-ignore: No type
import { useSpeechSynthesis } from 'react-speech-kit';
import { User } from '../../types/user';
import { getAccount } from '../services/account';

const subHeaderText = `This is your dashboard screen.`;

const Dashboard = () => {
  const [inFlight, setInFlight] = useState(true);
  const [isRead, setAsRead] = useState(false);
  const [user, setUser] = useState<User | null>();
  const onEnd = () => setAsRead(true);
  const { speak, supported, speaking, cancel } = useSpeechSynthesis({
    onEnd,
  });
  const headerText = useMemo(
    () => (user?.full_name ? `Welcome ${user?.full_name},` : ''),
    [user?.full_name],
  );

  useEffect(() => {
    (async function () {
      try {
        const data = await getAccount();
        if (supported && !isRead)
          speak({
            text: `Welcome ${data.full_name},` + ' ' + subHeaderText,
          });
        setUser(data);
      } catch (e) {
        console.log('error ', e);
      } finally {
        setInFlight(false);
      }
    })();
    //eslint-disable-next-line
  }, [isRead, supported]);

  if (inFlight)
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
        <Skeleton height="25px" width="350px" mb={3} />
        <Skeleton height="15px" width="220px" mb={2} />
      </Flex>
    );

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
    </Flex>
  );
};

export default Dashboard;
