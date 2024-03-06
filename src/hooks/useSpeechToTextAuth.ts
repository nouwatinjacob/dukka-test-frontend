import { useCallback, useEffect, useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { FormValues } from '../components/LoginForm';
import { getPromptByInputName } from '../utils/auth';

type HookOptions = {
  saveFormValue(field: string, value: string): void;
};
const useSpeechToTextAuth = ({ saveFormValue }: HookOptions) => {
  const [currentInputName, setCurrentInputName] = useState<
    keyof FormValues | string
  >('');
  const [isRead, setAsRead] = useState(false);
  const onSpeakEnd = () => setAsRead(true);

  const { speak, speaking } = useSpeechSynthesis({
    onEnd: onSpeakEnd,
  });

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const getInputPlaceholder = (
    inputName: string,
    defaultPlaceholder: string,
  ) => {
    if (listening && inputName === currentInputName) return 'Listening...';
    return defaultPlaceholder;
  };

  const startListening = useCallback(
    (field: string) => {
      if (!browserSupportsSpeechRecognition) return;
      setCurrentInputName(field);
      speak({ text: getPromptByInputName(field) });
      SpeechRecognition.startListening({
        language: 'af',
      });
      setTimeout(() => SpeechRecognition.stopListening(), 8000);
    },
    [browserSupportsSpeechRecognition, speak],
  );

  useEffect(() => {
    if (!listening && transcript) {
      saveFormValue(currentInputName as any, transcript); // Update the input with user's response
      resetTranscript();
    }
  }, [currentInputName, listening, resetTranscript, saveFormValue, transcript]);

  return {
    speaking,
    listening,
    currentInputName,
    startListening,
    getInputPlaceholder,
  };
};

export default useSpeechToTextAuth;
