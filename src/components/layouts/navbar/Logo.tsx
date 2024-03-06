/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Heading, Highlight } from '@chakra-ui/react';

export const Logo = () => {
  return (
    <Heading as="h5" size="md" userSelect="none" color="subtle">
      <Highlight
        query=".to."
        styles={{
          color: 'purple.600',
          fontWeight: 400,
        }}
      >
        {`Speech.to.Text`}
      </Highlight>
    </Heading>
  );
};

export default Logo;
