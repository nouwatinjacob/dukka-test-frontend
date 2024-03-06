import { Icon, IconProps } from '@chakra-ui/react';
import { PiSpeakerNoneBold, PiSpeakerSimpleHighBold } from 'react-icons/pi';

type PromptIconProps = IconProps & {
  speaking?: boolean;
};

function PromptIcon({ speaking, ...props }: PromptIconProps) {
  return (
    <Icon
      boxSize="1.3em"
      mb="0.5rem"
      cursor="pointer"
      _hover={{ color: 'purple.500' }}
      color={speaking ? 'purple.500' : 'purple.900'}
      as={speaking ? PiSpeakerSimpleHighBold : PiSpeakerNoneBold}
      {...props}
    />
  );
}

export default PromptIcon;
