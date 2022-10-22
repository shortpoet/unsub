export interface Session {
  accessToken: string;
  refreshToken: string;
  user: User;
  organization: Organization;
}

export interface User {
  id: string;
  username: string;
  role: string;
  organizationId: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

type AllowdOrganizationTypes =
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

export interface Organization {
  id: string;
  name: string;
  type: AllowdOrganizationTypes;
}

export const CARLOS: User = {
  id: '1',
  username: 'carlos',
  role: 'admin',
  organizationId: '1',
  email: 'carlos@shortpoet.com',
  firstName: 'Carlos',
  lastName: 'Soriano'
};

export const SHORTPOET: Organization = {
  id: '1',
  name: 'Shortpoet',
  type: 'primary'
};

export const SESSION: Session = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  user: CARLOS,
  organization: SHORTPOET
};
