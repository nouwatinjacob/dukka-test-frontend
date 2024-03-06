import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// @ts-ignore: no declaration file
import { useSpeechSynthesis } from 'react-speech-kit';
import LoginForm from '../components/LoginForm';
import useAuth from '../hooks/useAuth';
import { login } from '../services/account';
import { clearAuthState } from '../utils/storage';

const headerText = `Login to your account with the form below. Click on the speaker icons 
          to listen to the voice prompts.`;
const Login = () => {
  const navigate = useNavigate();
  const [inFlight, setInFlight] = useState(false);
  const [isRead, setAsRead] = useState(false);
  const { loginWithContext } = useAuth();

  const onEnd = () => setAsRead(true);
  const { speak, supported, speaking, cancel } = useSpeechSynthesis({
    onEnd,
  });

  useEffect(() => {
    if (!supported || isRead) return;
    speak({
      text: headerText,
    });

    return () => {
      if (speaking) {
        cancel();
      }
    };
    // eslint-disable-next-line
  }, [supported, isRead, cancel]);

  const onSave = async (values: Record<string, unknown>) => {
    clearAuthState();
    setInFlight(true);
    try {
      const data = await login(values);
      loginWithContext(data);
      navigate('/dashboard');
    } catch (e) {
      console.log('error ', e);
    } finally {
      setInFlight(false);
    }
  };
  return (
    <Box mt={{ base: 0, md: 12 }}>
      <LoginForm onSave={onSave} loading={inFlight} />
    </Box>
  );
};

export default Login;
