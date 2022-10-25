export interface Session {
  accessToken: string;
  refreshToken: string;
  user: User;
  account: Account;
}

export interface User {
  id: string;
  username: string;
  roles: string[];
  accountId: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

type AllowdAccountTypes =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'quinary'
  | 'senary'
  | 'septenary'
  | 'octonary'
  | 'nonary'
  | 'denary';

export interface Account {
  id: string;
  name: string;
  type: AllowdAccountTypes;
}

export const CARLOS: User = {
  id: '1',
  username: 'carlos',
  roles: ['admin', 'user'],
  accountId: '1',
  email: 'carlos@shortpoet.com',
  firstName: 'Carlos',
  lastName: 'Soriano'
};

export const SHORTPOET: Account = {
  id: '1',
  name: 'Shortpoet',
  type: 'primary'
};

export const SESSION: Session = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  user: CARLOS,
  account: SHORTPOET
};
