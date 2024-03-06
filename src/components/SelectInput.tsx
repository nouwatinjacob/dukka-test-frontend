// SelectInput.tsx
import React, { FC } from 'react';
import Select, { Props } from 'react-select';

interface SelectInputProps extends Props {
  hasError?: boolean;
}

const SelectInput: FC<SelectInputProps> = ({ hasError, ...props }) => {
  return (
    <Select
      {...props}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          height: '40px',
          width: '100%',
          borderRadius: '7px',
          borderWidth: '1px',
          boxShadow: state.isFocused || state.menuIsOpen ? 'none' : undefined,
          borderColor: hasError ? 'red' : undefined,
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          fontSize: '16px',
        }),
      }}
    />
  );
};

export default SelectInput;
