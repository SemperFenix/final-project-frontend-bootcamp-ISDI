import { BehaviorSubject, Observable, of } from 'rxjs';
import { AikidoUser, ProtoAikidoUser, UsersList } from 'src/types/aikido.user';
import { LoggedUser } from 'src/types/login';
import { ServerUsersResponse } from 'src/types/server.responses';
import { TechsList, Tech, ProtoTechsList } from 'src/types/tech';

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
  timePracticing: '',
  age: 32,
  mainUke: [],
  principalSensei: [],
  avatar: '',
};

export const mockAikidoSensei: AikidoUser = {
  ...mockProtoAikidoUser,
  avatar: '',
  techsLearnt: [],
  techsInProgress: [],
  role: 'sensei',
  id: '1',
  techToReview: '',
  timePracticing: '',
  age: 32,
  mainUke: [],
  principalSensei: [],
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

  updateSelfUser: () => {
    return new Observable<AikidoUser>();
  },

  deleteSelfUser: () => {
    return new Observable<unknown>();
  },

  senseis$: new BehaviorSubject<UsersList>(mockSenseisList),
  students$: new BehaviorSubject<UsersList>(mockUsersList),
};

export const mockTechsList: ProtoTechsList = {
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
    return of({
      name: 'TestName',
      lastName: 'TestLast',
    } as unknown as AikidoUser);
  },
  userLogged$: new BehaviorSubject<LoggedUser>({
    id: 'TestId',
    role: 'TestRole',
    email: 'TestMail',
  }),
  token$: new BehaviorSubject<string>('TestToken'),
  currentUser$: new BehaviorSubject<AikidoUser>(mockAikidoUser),
};

export const mockTechsService = {
  getTechsCategorized: () => {
    // const techs: Tech[] = [{} as Tech, {} as Tech];
    // const number = 3;
    return of({
      Ikkyo: { techs: [{}, {}, {}], number: 0 },
      Nikkyo: { techs: [{}, {}, {}], number: 0 },
      Sankyo: { techs: [{}, {}, {}], number: 0 },
    });
  },

  getTechsFiltered: () => {
    return of([]);
  },
  token: '',
  techs$: new BehaviorSubject<TechsList>({
    Ikkyo: { techs: [], number: 6 },
    Nikkyo: { techs: [{}], number: 6 },
    Sankyo: { techs: [], number: 6 },
  } as unknown as TechsList),
  currentTech$: new BehaviorSubject<Tech>({} as Tech),
};
