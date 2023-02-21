/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';

interface SeedUser {
  email: string;
  fullName: string;
  password: string;
  roles: string[];
}

interface SeedData {
  users: SeedUser[];
}

export const initialData: SeedData = {
  users: [
    {
      email: 'test1@google.com',
      fullName: 'TestOne',
      password: bcrypt.hashSync('Abc123', 10),
      roles: ['admin'],
    },
    {
      email: 'test2@google.com',
      fullName: 'TestTwo',
      password: bcrypt.hashSync('Abc123', 10),
      roles: ['user'],
    },
    {
      email: 'test3@google.com',
      fullName: 'TestThree',
      password: bcrypt.hashSync('Abc123', 10),
      roles: ['admin', 'super'],
    },
  ],
};
