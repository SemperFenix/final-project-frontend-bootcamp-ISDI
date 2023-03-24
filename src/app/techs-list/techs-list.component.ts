import { Component, OnDestroy } from '@angular/core';
import { first, forkJoin, Observable, Subscription } from 'rxjs';
import {
  MyTechsList,
  Techniques,
  TechPages,
  TechsList,
  techsListed,
} from 'src/types/tech';
import { TechsService } from '../services/techs.service';

@Component({
  selector: 'app-techs-list',
  templateUrl: './techs-list.component.html',
  styleUrls: ['./techs-list.component.scss'],
})
export class TechsListComponent {
  techs$: Subscription;
  techs: MyTechsList;
  techPage: Partial<TechPages>[];
  techPages: Partial<TechPages>;
  techsToSearch: Techniques[] = techsListed;

  constructor(private techsService: TechsService) {
    this.techPage = techsListed.map((item) => ({ [item]: 1 }));
    this.techPages = this.techPage.reduce((obj, item) => ({ ...obj, ...item }));
    this.techs = {} as MyTechsList;
    forkJoin([
      techsListed.map((item) =>
        this.techsService.getTechsCategorized('1', item).subscribe()
      ),
    ]);
    this.techs$ = this.techsService.techs$
      .pipe()
      .subscribe((data) => (this.techs = { ...this.techs, ...data }));
    // this.techs = this.techs$
  }

  handleNext = (pTech: Techniques) => {
    const maxPage = Math.ceil(this.techsService.techs$.value[pTech].number / 3);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (this.techPages[pTech]! >= maxPage) return;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.techPages[pTech]!++;

    this.techs$ = this.techsService
      .getTechsCategorized(String(this.techPages[pTech]), pTech)
      .pipe(first())
      .subscribe((data) => (this.techs = { ...this.techs, ...data }));
  };
  handlePrev = (pTech: Techniques) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (this.techPages[pTech]! <= 1) return;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.techPages[pTech]!--;
    this.techs$ = this.techsService
      .getTechsCategorized('1', pTech)
      .pipe(first())
      .subscribe((data) => (this.techs = { ...this.techs, ...data }));
  };
}
