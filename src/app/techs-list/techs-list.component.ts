import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import {
  MyTechsList,
  Tech,
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
export class TechsListComponent implements OnInit {
  techs: MyTechsList;
  techPages: TechPages;
  techsToSearch: Techniques[];

  constructor(private techsService: TechsService) {
    this.techs = {} as MyTechsList;
    this.techPages = {} as TechPages;
    this.techsToSearch = techsListed;
  }

  ngOnInit(): void {
    this.initializeTechPages();
    this.loadTechs();
    this.subscribeToTechsUpdates();
  }

  private initializeTechPages(): void {
    this.techsToSearch.forEach((tech) => {
      this.techPages[tech] = { page: 1, exists: false };
    });
  }

  private loadTechs(): void {
    const observables: Observable<MyTechsList>[] = this.techsToSearch.map(
      (tech) => {
        console.log(tech);
        return this.techsService.getTechsCategorized('1', tech).pipe(first());
      }
    );

    forkJoin(observables).subscribe();
  }

  private subscribeToTechsUpdates(): void {
    this.techsService.techs$.subscribe((data) => {
      this.techs = data;
      Object.entries(this.techs).forEach((item) => {
        this.checkExistence(item[1].techs, item[0] as Techniques);
      });
    });
  }

  private checkExistence(obj: Tech[], tech: Techniques): void {
    if (obj.length === 0) return;
    this.techPages[tech].exists = true;
  }

  handleNext(pTech: Techniques): void {
    const maxPage = Math.ceil(this.techsService.techs$.value[pTech].number / 3);
    console.log(maxPage, this.techPages);
    if (this.techPages[pTech].page >= maxPage) {
      return;
    }
    this.techPages[pTech].page++;
    this.loadTechsForPage(pTech, this.techPages[pTech].page);
  }

  handlePrev(pTech: Techniques): void {
    if (this.techPages[pTech].page <= 1) return;

    this.techPages[pTech].page--;
    this.loadTechsForPage(pTech, this.techPages[pTech].page);
  }

  private loadTechsForPage(pTech: Techniques, page: number): void {
    this.techsService
      .getTechsCategorized(String(page), pTech)
      .pipe(first())
      .subscribe((data) => {
        this.techs = { ...this.techs, ...data };
      });
  }
}
