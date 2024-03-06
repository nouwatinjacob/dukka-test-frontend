import { Flex, Container, Button, Box, IconButton } from '@chakra-ui/react';
import React from 'react';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import useAuth from '../../../hooks/useAuth';

const NavBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logoutWithContext } = useAuth();
  const handleLogout = () => {
    logoutWithContext();
    navigate('/login');
  };
  return (
    <>
      <Flex
        zIndex={5}
        w="full"
        minH="70px"
        maxH="70px"
        bg="white"
        borderBottom={'0.5px solid'}
        borderBottomColor={'gray.200'}
        shadow={'sm'}
      >
        <Flex as="nav" w="full" h="full" align="center">
          <Container
            py={1.5}
            maxW={{ base: '100%', md: '7xl' }}
            h="full"
            alignItems="center"
          >
            <Flex
              justify="space-between"
              align="center"
              h="full"
              columnGap={20}
            >
              <Box display={{ base: 'block', md: 'block' }}>
                <Link to="/">
                  <Logo />
                </Link>
              </Box>

              <Flex justify="end" align="center" columnGap={5}>
                {isAuthenticated ? (
                  <IconButton
                    size="md"
                    icon={<AiOutlinePoweroff fontSize="2xl" />}
                    aria-label="dropdown-icon"
                    onClick={handleLogout}
                    color="red"
                    title="Logout"
                  />
                ) : (
                  <Link to="/login">
                    <Button
                      as="a"
                      variant="outline"
                      textDecoration="none"
                      borderRadius="30px"
                      colorScheme="purple"
                      size="md"
                    >
                      Sign In
                    </Button>
                  </Link>
                )}
              </Flex>
            </Flex>
          </Container>
        </Flex>
      </Flex>
    </>
  );
};

export default NavBar;
