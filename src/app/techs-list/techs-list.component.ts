import { Component } from '@angular/core';
import { first, forkJoin, Subscription } from 'rxjs';
import {
  MyTechsList,
  Techniques,
  TechPages,
  techsListed,
} from 'src/types/tech';
import { TechsService } from '../services/techs.service';

@Component({
  selector: 'app-techs-list',
  templateUrl: './techs-list.component.html',
  styleUrls: ['./techs-list.component.scss'],
})
export class TechsListComponent {
  techs: MyTechsList;
  techPage: TechPages[];
  techPages: TechPages;
  techsToSearch: Techniques[];

  constructor(private techsService: TechsService) {
    this.techsToSearch = techsListed;
    this.techPage = techsListed.map((item) => ({
      [item]: { page: 1, exists: false },
    })) as unknown as TechPages[];
    this.techPages = this.techPage.reduce((obj, item) => ({ ...obj, ...item }));
    this.techs = {} as MyTechsList;
    forkJoin<[Subscription]>([
      techsListed.map((item) =>
        this.techsService
          .getTechsCategorized('1', item)
          .subscribe((data) => this.checkExistence(data, item))
      ),
    ]);
    this.techsService.techs$
      .pipe()
      .subscribe((data) => (this.techs = { ...this.techs, ...data }));
  }

  handleNext = (pTech: Techniques) => {
    const maxPage = Math.ceil(this.techsService.techs$.value[pTech].number / 3);
    if (this.techPages[pTech].page >= maxPage) return;
    this.techPages[pTech].page++;
    this.techsService
      .getTechsCategorized(String(this.techPages[pTech].page), pTech)
      .pipe(first())
      .subscribe((data) => (this.techs = { ...this.techs, ...data }));
  };
  handlePrev = (pTech: Techniques) => {
    if (this.techPages[pTech].page <= 1) return;
    this.techPages[pTech].page--;
    this.techsService
      .getTechsCategorized('1', pTech)
      .pipe(first())
      .subscribe((data) => (this.techs = { ...this.techs, ...data }));
  };

  checkExistence = (array: MyTechsList, tech: Techniques): void => {
    if (array[tech].techs.length === 0) return;
    this.techPages[tech].exits = true;
    return;
  };
}
