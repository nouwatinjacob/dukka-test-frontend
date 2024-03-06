import * as yup from 'yup';

const schema = yup
  .object({
    full_name: yup
      .string()
      .typeError('This is required')
      .required('Please enter your full name'),
    phone_number: yup
      .string()
      .matches(
        /^(?:(?:(?:\+?234(?:h1)?|01)h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/,
        'Enter correct phone number format',
      )
      .typeError('Phone number format is not correct')
      .required('Your phone number is required'),
    email: yup
      .string()
      .email('Please enter your email address')
      .required('Your email address is required'),
    sex: yup.string().required('Your sex is required'),
    country: yup.string().required('Your country is required'),

    password: yup
      .string()
      .required('Enter your password')
      .min(6, `Password must be at least 6 characters`),
    confirm_password: yup
      .string()
      .required('Enter password confirmation')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  })
  .required();

export default schema;
