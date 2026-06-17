export type NegativeLoginData = {
  testcase: string;
  title: string;
  username: string;
  password: string;
  message: string;
};

export const NegativeLoginSet: NegativeLoginData[] = [
  {
    testcase: 'TC-LOGIN-02',
    title: 'wrong username, correct password',
    username: 'invalid_user',
    password: 'secret_sauce',
    message: 'Username and password do not match any user in this service',
  },
  {
    testcase: 'TC-LOGIN-03',
    title: 'correct username, wrong password',
    username: 'standard_user',
    password: 'invalid_password',
    message: 'Username and password do not match any user in this service',
  },

  {
    testcase: 'TC-LOGIN-04',
    title: 'wrong username, wrong password',
    username: 'invalid_user',
    password: 'invalid_password',
    message: 'Username and password do not match any user in this service',
  },
  {
    testcase: 'TC-LOGIN-05',
    title: 'correct username with leading spaces, correct password',
    username: '   standard_user',
    password: 'secret_sauce',
    message: 'Username and password do not match any user in this service',
  },
  {
    testcase: 'TC-LOGIN-06',
    title: 'correct username with trailing spaces, correct password',
    username: 'standard_user   ',
    password: 'secret_sauce',
    message: 'Username and password do not match any user in this service',
  },
  {
    testcase: 'TC-LOGIN-07',
    title: 'correct username, correct password with leading spaces',
    username: 'standard_user',
    password: '   secret_sauce',
    message: 'Username and password do not match any user in this service',
  },
  {
    testcase: 'TC-LOGIN-08',
    title: 'correct username, correct password with trailing spaces',
    username: 'standard_user',
    password: 'secret_sauce   ',
    message: 'Username and password do not match any user in this service',
  },
  {
    testcase: 'TC-LOGIN-09',
    title: 'blank username, correct password',
    username: '',
    password: 'secret_sauce',
    message: 'Username is required',
  },
  {
    testcase: 'TC-LOGIN-10',
    title: 'correct username, blank password',
    username: 'standard_user',
    password: '',
    message: 'Password is required',
  },
  {
    testcase: 'TC-LOGIN-11',
    title: 'blank username and password',
    username: '',
    password: '',
    message: 'Username is required',
  },
  {
    testcase: 'TC-LOGIN-12',
    title: 'locked out user',
    username: 'locked_out_user',
    password: 'secret_sauce',
    message: 'Sorry, this user has been locked out.',
  },
];