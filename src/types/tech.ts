/* eslint-disable no-unused-vars */
/* eslint-disable max-params */

import { AikidoUser, Grades } from './aikido.user';

export type Attack =
  | 'Katate-dori'
  | 'Ai hanmi katate-dori'
  | 'Ryote-dori'
  | 'Morote-dori'
  | 'Mune-dori'
  | 'Ryomune-dori'
  | 'Kata-dori'
  | 'Ryo kata-dori'
  | 'Kao-tsuki'
  | 'Jodan-tsuki'
  | 'Chudan-tsuki'
  | 'Mawasi-tsuki'
  | 'Men-Uchi'
  | 'Shomen-uchi'
  | 'Yokomen-uchi'
  | 'Ushiro tekubi-dori'
  | 'Ushiro kubishime'
  | 'Ushiro ryokata-dori'
  | 'Mae-geri'
  | 'Yoko-geri'
  | 'Mawashi-geri'
  | 'Katate ryote-dori'
  | 'Muna-dori'
  | 'Kata-dori menuchi'
  | 'Eridori';

export type Technique =
  | 'Ikkyo'
  | 'Nikkyo'
  | 'Sankyo'
  | 'Gokyo'
  | 'Yonkyo'
  | 'Rokkyo'
  | 'Irimi-nage'
  | 'Juji-nage'
  | 'Kaiten-nage'
  | 'Kokyu-nage'
  | 'Koshi-nage'
  | 'Shiho-nage'
  | 'Tenchi-nage'
  | 'Ude kime-nage'
  | 'Kote-hineri'
  | 'Kote-gaeshi'
  | 'Hiji-garami'
  | 'Sumi-otoshi'
  | 'Uchi kaiten-nage'
  | 'Uchi kaiten-sankyo'
  | 'Hiji kime-osae'
  | 'Kokyu-ho'
  | 'Soto kaiten-nage'
  | 'Jiyu-waza'
  | 'Ushiro kiri-otoshi';

export type Stand =
  | 'Tachi-waza'
  | 'Suwari-waza'
  | 'Hanmi handachi-waza'
  | 'Ushiro-waza';
export interface ProtoTech {
  attack: Attack;
  tech: Technique;
  stand: Stand;
  grade: Grades;
  video?: string;
}

export interface Tech extends ProtoTech {
  id: string;
  usersLearnt: AikidoUser[];
  usersInProgress: AikidoUser[];
  usersToLearn: AikidoUser[];
}

export type ProtoTechsList = {
  techs: Tech[];
  number: number;
};

export type TechsList = {
  [Property in Technique]: ProtoTechsList;
};

export type TechPages = {
  [Name in Technique]: {
    page: number;
    exists: boolean;
  };
};

export const techsListed: Technique[] = [
  'Ikkyo',
  'Nikkyo',
  'Sankyo',
  'Gokyo',
  'Yonkyo',
  'Rokkyo',
  'Irimi-nage',
  'Juji-nage',
  'Kaiten-nage',
  'Kokyu-nage',
  'Koshi-nage',
  'Shiho-nage',
  'Tenchi-nage',
  'Ude kime-nage',
  'Kote-hineri',
  'Kote-gaeshi',
  'Hiji-garami',
  'Sumi-otoshi',
  'Uchi kaiten-nage',
  'Uchi kaiten-sankyo',
  'Hiji kime-osae',
  'Kokyu-ho',
  'Soto kaiten-nage',
  'Jiyu-waza',
  'Ushiro kiri-otoshi',
];
