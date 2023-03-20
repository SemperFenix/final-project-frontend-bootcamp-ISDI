import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AikidoUser, ProtoAikidoUser, UsersList } from 'src/types/aikido.user';
import { LoggedUser } from 'src/types/login';
import {
  ServerLoginResponse,
  ServerUsersResponse,
} from 'src/types/server.responses';

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

export const mockAikidoSensei: AikidoUser = {
  ...mockProtoAikidoUser,
  techsLearnt: [],
  techsInProgress: [],
  role: 'sensei',
  id: '1',
  techToReview: '',
};

export const mockUser: LoggedUser = {
  email: 'TestMail',
  id: 'TestId',
  role: 'user',
};

export const mockUsersList: UsersList = {
  users: [mockAikidoUser],
  number: 9,
};

export const mockSenseisList: UsersList = {
  users: [mockAikidoSensei],
  number: 9,
};

export const mockToken =
  'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJpZCI6IiIsImVtYWlsIjoiIiwicm9sZSI6IiIsImlhdCI6MTY3OTA0ODgwNH0.U8s8UMTJddjfXH_qbxiJJ5GuJeEhryxFmv8d8DBMsycVTt-k1sdAFEq9yRUXbawo';

export const mockAikidoUsersService = {
  login: () => {
    return new Observable<ServerLoginResponse>();
  },
  register: () => {
    return new Observable<AikidoUser>();
  },
  getSenseiUsers: () => {
    return new Observable<ServerUsersResponse>();
  },
  getStudentUsers: () => {
    return new Observable<ServerUsersResponse>();
  },
  senseiUsers: () => {
    return;
  },
  studentUsers: () => {
    return;
  },
  token: mockToken,
  token$: new BehaviorSubject<string>(''),
  senseis$: new BehaviorSubject<UsersList>(mockSenseisList),
  students$: new BehaviorSubject<UsersList>(mockUsersList),
};

export const mockLoginService = {
  loggedUser$: () => {
    return;
  },
  getLoggedUser: () => {
    return new Observable<LoggedUser>();
  },
  userLogged$: new Subject<LoggedUser>(),
  userLogged: { email: '', id: '', role: 'logout' },
};
