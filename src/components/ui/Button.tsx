import {
  Button as ChakraButton,
  ButtonProps,
  StyleProps,
} from '@chakra-ui/react';
import React from 'react';

type ButtonVariant = 'primary' | 'secondary';
type CustomButtonProps = ButtonProps & {
  variant?: ButtonVariant;
};

const Button: React.FC<CustomButtonProps> = ({ variant, ...rest }) => {
  let buttonComponent;

  switch (variant) {
    case 'primary':
      buttonComponent = <PrimaryButton {...rest} />;
      break;
    case 'secondary':
      buttonComponent = <SecondaryButton {...rest} />;
      break;
    default:
      buttonComponent = <ChakraButton {...rest} />;
      break;
  }

  return buttonComponent;
};

const commonProps: StyleProps = {
  borderRadius: '4px',
  fontSize: '14px',
  fontWeight: 500,
  fontStyle: 'normal',
  fontFamily: `'Inter', sans-serif`,
};

const PrimaryButton: React.FC<ButtonProps> = ({ ...rest }) => (
  <ChakraButton
    color="white"
    bg="custom.100"
    {...commonProps}
    _hover={{ bg: 'custom.200' }}
    _disabled={{ opacity: 0.8 }}
    {...rest}
  />
);

const SecondaryButton: React.FC<ButtonProps> = ({ ...rest }) => (
  <ChakraButton
    color="#000000"
    bg="#F9F9FB"
    {...commonProps}
    _hover={{ color: 'custom.100' }}
    _disabled={{ opacity: 0.8 }}
    {...rest}
  />
);

export default Button;
