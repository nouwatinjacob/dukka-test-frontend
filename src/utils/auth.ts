export const INPUT_LABELS: { [key: string]: string } = {
  full_name: 'full name',
  phone_number: 'phone number',
  email: 'email address',
  sex: 'sex',
  country: 'country',
  password: 'password',
  confirm_password: 'password confirmation',
};

export const getPromptByInputName = (inputName: string) =>
  `Please say your ${INPUT_LABELS[inputName]}`;
