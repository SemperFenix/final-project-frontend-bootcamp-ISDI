import { AikidoUser } from './aikido.user';

export type ServerLoginResponse = {
  results: { token: string }[];
};

export type ServerRegisterResponse = {
  results: AikidoUser[];
};
