import { useToast, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// @ts-ignore: No declaration file
import { useSpeechSynthesis } from 'react-speech-kit';
import SignUpForm from '../components/signup/SignUpForm';
import { register } from '../services/account';
import { saveAuthState } from '../utils/storage';

const headerText = `Create an account with the form below. Click on the speaker icons 
          to listen to the voice prompts.`;
const SignUp = () => {
  const toast = useToast();

  const navigate = useNavigate();
  const [inFlight, setInFlight] = useState(false);
  const [isRead, setAsRead] = useState(false);
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
    setInFlight(true);
    try {
      const data = await register(values);
      saveAuthState(data);
      toast({
        title: 'Account created.',
        description: 'Redirecting to login!',
        status: 'success',
      });
      navigate('/login');
    } catch (e) {
      console.log('error ', e);
    } finally {
      setInFlight(false);
    }
  };

  return (
    <Box mt={{ base: 0, md: 6 }}>
      <SignUpForm onSave={onSave} loading={inFlight} />
    </Box>
  );
};

export default SignUp;
