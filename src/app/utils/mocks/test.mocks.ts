import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AikidoUser, ProtoAikidoUser } from 'src/types/aikido.user';
import { LoggedUser } from 'src/types/login';
import { ServerLoginResponse } from 'src/types/server.responses';

const count = 'TestPass';

export const mockProtoAikidoUser: ProtoAikidoUser = {
  name: 'TestName',
  lastName: 'TestLast',
  email: 'TestMail',
  grade: '6º kyu',
  password: count,
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

export const mockLoginService = {
  loggedUser: () => {
    return;
  },
  getLoggedUser$: () => {
    return new Observable<LoggedUser>();
  },
  userLogged$: new Subject<LoggedUser>(),
  userLogged: { email: '', id: '', role: 'logout' },
};

export const mockUser: LoggedUser = {
  email: 'TestMail',
  id: 'TestId',
  role: 'user',
};
