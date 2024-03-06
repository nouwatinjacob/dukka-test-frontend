import { Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { HiOutlineUserCircle } from 'react-icons/hi';

const UserDropdown = () => (
  <Flex align="center" display={{ base: 'none', md: 'flex' }}>
    <Icon
      as={HiOutlineUserCircle}
      color="purple.700"
      h="24px"
      w="24px"
      _hover={{ opacity: 0.7 }}
    />
    <Text color="pruple.700">Adriana Arias</Text>
  </Flex>
);

export default UserDropdown;
