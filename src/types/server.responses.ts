import { AikidoUser, UsersList } from './aikido.user';
import { ProtoTechsList } from './tech';

export type ServerLoginResponse = {
  results: { token: string }[];
};

export type ServerCompleteUserResponse = {
  results: AikidoUser[];
};

export type ServerUsersResponse = {
  results: [UsersList];
};

export type ServerTechsResponse = {
  results: [ProtoTechsList];
};
