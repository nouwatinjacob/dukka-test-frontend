import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const styles = {
  global: (props: Record<string, unknown>) => ({
    body: {
      margin: 0,
      padding: 0,
      fontFamily: `'Nunito Sans', sans-serif`,
      fontSize: '14px',
      fontWeight: 400,
      bg: 'gray.50',
      lineHeight: 'base',
      ' > :last-child': {
        overflow: 'hidden',
        marginBottom: '-1px',
      },
    },
    '*::placeholder': {
      color: mode('gray.600', 'whiteAlpha.400')(props),
      fontSize: '14px',
    },
    '*, *::before, &::after': {
      borderColor: mode('gray.200', 'whiteAlpha.300')(props),
      wordWrap: 'break-word',
    },
    '#nprogress .bar': {
      bg: 'orange.500',
      height: '3px',
    },
  }),
};

const colors = {
  custom: {
    100: '#605DEC',
    500: '#344293',
  },
};

export const theme = extendTheme({
  styles,
  colors,
  components: {
    Input: {
      baseStyle: {},
      variants: {
        defaultVariant: {
          field: {
            fontSize: '14px',
            border: '1px solid',
            borderColor: '#DCDFE3',
            _hover: {},
            _focus: {
              outline: 'none',
            },
          },
        },
      },
      defaultProps: {
        variant: 'defaultVariant',
      },
    },
  },
});

export default theme;
