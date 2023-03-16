import { BehaviorSubject, Observable } from 'rxjs';
import { AikidoUser, ProtoAikidoUser } from 'src/types/aikido.user';
import { ServerLoginResponse } from 'src/types/server.responses';

export const mockProtoAikidoUser: ProtoAikidoUser = {
  name: 'TestName',
  lastName: 'TestLast',
  email: 'TestMail',
  grade: '6º kyu',
  password: 'TestPass',
};

export const mockAikidoUser: AikidoUser = {
  ...mockProtoAikidoUser,
  techsLearnt: [],
  techsInProgress: [],
  role: 'user',
  id: '1',
  techToReview: '',
};

export const mockAikidoUsersService = {
  login: () => {
    return new Observable<ServerLoginResponse>();
  },
  register: () => {
    return new Observable<AikidoUser>();
  },
  token$: new BehaviorSubject<string>(''),
};
