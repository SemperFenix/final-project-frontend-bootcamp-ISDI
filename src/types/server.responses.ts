import { AikidoUser, UsersList } from './aikido.user';

export type ServerLoginResponse = {
  results: { token: string }[];
};

export type ServerRegisterResponse = {
  results: AikidoUser[];
};

export type ServerUsersResponse = {
  results: [UsersList];
};
