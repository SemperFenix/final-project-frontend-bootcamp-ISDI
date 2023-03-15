/* eslint-disable no-unused-vars */
/* eslint-disable max-params */

import { Login } from './login';
import { Tech } from './tech';

export type Grades =
  | '6º kyu'
  | '5º kyu'
  | '4º kyu'
  | '3º kyu'
  | '2º kyu'
  | '1º kyu'
  | '1º DAN'
  | '2º DAN'
  | '3º DAN'
  | '4º DAN'
  | '5º DAN'
  | '6º DAN'
  | '7º DAN';

export interface ProtoAikidoUser extends Login {
  name: string;
  lastName: string;
  grade: Grades;
  avatar?: string;
  age?: number;
  timePracticing?: string;
  principalSensei?: AikidoUser;
  mainUke?: AikidoUser;
}
export interface AikidoUser extends ProtoAikidoUser {
  techsLearnt: Tech[];
  techsInProgress: Tech[];
  role: 'user' | 'sensei';
  techToReview: string; // Esta propiedad está añadida por si me da tiempo a aumentar funcionalidades
  id: string;
  avatar?: string;
  age?: number;
  timePracticing?: string;
  principalSensei?: AikidoUser;
  mainUke?: AikidoUser;
}
