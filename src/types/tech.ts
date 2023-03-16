/* eslint-disable no-unused-vars */
/* eslint-disable max-params */

import { AikidoUser, Grades } from './aikido.user';

export class ProtoTech {
  constructor(
    public attack: string,
    public tech: string,
    public stand: string,
    public grade: Grades,
    public video?: string
  ) {}
}

export class Tech extends ProtoTech {
  constructor(
    public id: string,
    public override attack: string,
    public override tech: string,
    public override stand: string,
    public override grade: Grades,
    public usersLearnt: AikidoUser[],
    public usersInProgress: AikidoUser[],
    public usersToLearn: AikidoUser[],
    public override video?: string
  ) {
    super(attack, tech, stand, grade, video);
  }
}
