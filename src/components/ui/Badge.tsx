import { Badge as ChakraBadge, BadgeProps } from '@chakra-ui/react';
import React from 'react';

const Badge: React.FC<BadgeProps> = (props) => (
  <ChakraBadge
    {...props}
    p="4px 24px"
    fontSize="12px"
    lineHeight="20px"
    borderRadius="12px"
    fontWeight={400}
    fontStyle="normal"
    textTransform="initial"
  />
);

export default Badge;
