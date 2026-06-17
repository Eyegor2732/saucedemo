export type PositiveLoginData = {
  testcase: string;
  title: string;
  username: string;
  password: string;

};

export const PositiveLoginSet: PositiveLoginData[] = [
  {
    testcase: 'TC-LOGIN-01',
    title: 'standard_user with correct credentials',
    username: 'standard_user',
    password: 'secret_sauce',
  },
  {
    testcase: 'TC-LOGIN-13',
    title: 'problem_user with correct credentials',
    username: 'problem_user',
    password: 'secret_sauce',
  },
  {
    testcase: 'TC-LOGIN-14',
    title: 'performance_glitch_user with correct credentials',
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
  {
    testcase: 'TC-LOGIN-15',
    title: 'error_user with correct credentials',
    username: 'error_user',
    password: 'secret_sauce',
  },
  {
    testcase: 'TC-LOGIN-16',
    title: 'visual_user with correct credentials',
    username: 'visual_user',
    password: 'secret_sauce',
  }

];