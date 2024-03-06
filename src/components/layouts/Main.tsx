import { Box, Flex, Container } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './navbar/NavBar';

const Layout = () => {
  console.log('layout ');
  return (
    <Flex h="100vh" flexDir="column">
      <Flex h="full" w="full" flex={1} flexDir="column">
        <NavBar />
        <Container
          py={1.5}
          maxW="7xl"
          h="full"
          alignItems="center"
          flex={1}
          as={Flex}
        >
          <Box boxSizing="border-box" w="full" h="full" mx="auto">
            <Outlet />
          </Box>
        </Container>
      </Flex>
    </Flex>
  );
};

export default Layout;
