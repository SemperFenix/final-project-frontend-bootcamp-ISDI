import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AikidoUser, ProtoAikidoUser, UsersList } from 'src/types/aikido.user';
import { LoggedUser } from 'src/types/login';
import { ServerUsersResponse } from 'src/types/server.responses';
import { MyTechsList, Tech, TechsList } from 'src/types/tech';

const count = 'TestPass';

export const mockTech: Tech = {
  attack: 'Chudan-tsuki',
  tech: 'Gokyo',
  stand: 'Hanmi handachi-waza',
  id: 'TestId',
  grade: '1º DAN',
  usersInProgress: [],
  usersLearnt: [],
  usersToLearn: [],
  video: '',
};

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
  register: () => {
    return new Observable<AikidoUser>();
  },
  getSenseiUsers: () => {
    return new Observable<ServerUsersResponse>();
  },
  getStudentUsers: () => {
    return new Observable<ServerUsersResponse>();
  },

  senseis$: new BehaviorSubject<UsersList>(mockSenseisList),
  students$: new BehaviorSubject<UsersList>(mockUsersList),
};

export const mockTechsList: TechsList = {
  techs: [mockTech],
  number: 1,
};

export const mockLoginService = {
  login: () => {
    return new BehaviorSubject<string>('TestToken');
  },
  initialToken: () => {
    return;
  },

  getCurrentUser: () => {
    return new Observable<AikidoUser>();
  },
  userLogged$: new Subject<LoggedUser>(),
  token$: new BehaviorSubject<string>('TestToken'),
  currentUser$: new BehaviorSubject<AikidoUser>(mockAikidoUser),
};

export const mockTechsService = {
  getTechsCategorized: () => {
    return new Observable<MyTechsList>();
  },
  token: '',
  techs$: new BehaviorSubject<MyTechsList>({} as MyTechsList),
  currentTech$: new BehaviorSubject<Tech>({} as Tech),
};
