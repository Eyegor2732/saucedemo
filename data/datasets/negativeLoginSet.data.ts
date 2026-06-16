export type NegativeLoginData = {
  title: string;
  username: string;
  password: string;
  message: string;
};

export const NegativeLoginSet: NegativeLoginData[] = [
  {
    title: 'correct username, wrong password',
    username: 'standard_user',
    password: 'invalid_password',
    message: 'Username and password do not match any user in this service',
  },
  {
    title: 'wrong username, correct password',
    username: 'invalid_user',
    password: 'secret_sauce',
    message: 'Username and password do not match any user in this service',
  },
  {
    title: 'wrong username, wrong password',
    username: 'invalid_user',
    password: 'invalid_password',
    message: 'Username and password do not match any user in this service',
  },
  {
    title: 'correct username with leading spaces, correct password',
    username: '   standard_user',
    password: 'secret_sauce',
    message: 'Username and password do not match any user in this service',
  },
  {
    title: 'correct username with trailing spaces, correct password',
    username: 'standard_user   ',
    password: 'secret_sauce',
    message: 'Username and password do not match any user in this service',
  },
  {
    title: 'correct username, correct password with leading spaces',
    username: 'standard_user',
    password: '   secret_sauce',
    message: 'Username and password do not match any user in this service',
  },
  {
    title: 'correct username, correct password with trailing spaces',
    username: 'standard_user',
    password: 'secret_sauce   ',
    message: 'Username and password do not match any user in this service',
  },
  {
    title: 'locked out user',
    username: 'locked_out_user',
    password: 'secret_sauce',
    message: 'Sorry, this user has been locked out.',
  },
];