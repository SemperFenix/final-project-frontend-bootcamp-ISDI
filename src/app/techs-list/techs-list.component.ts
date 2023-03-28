import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import {
  TechsList,
  Tech,
  Technique,
  TechsPageAndExistence,
  techsListed,
  TechsFilter,
} from 'src/types/tech';
import { ModalHandlerService } from '../services/modal-handler.service';
import { TechsService } from '../services/techs/techs.service';

@Component({
  selector: 'app-techs-list',
  templateUrl: './techs-list.component.html',
  styleUrls: ['./techs-list.component.scss'],
})
export class TechsListComponent implements OnInit {
  techs: TechsList;
  techPages: TechsPageAndExistence;
  techsToSearch: Technique[];
  isFiltered: boolean;
  isFilterVisible: boolean;
  filteredTechs: Tech[];
  errorMessage!: string;
  errorModal: boolean;

  constructor(
    private techsService: TechsService,
    private modalService: ModalHandlerService,
    private router: Router,
    private zone: NgZone
  ) {
    this.errorModal = false;
    this.isFilterVisible = false;
    this.isFiltered = false;
    this.filteredTechs = [];
    this.techs = {} as TechsList;
    this.techPages = {} as TechsPageAndExistence;
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
    const observables: Observable<TechsList>[] = this.techsToSearch.map(
      (tech) => {
        return this.techsService.getTechsCategorized('1', tech).pipe(first());
      }
    );

    forkJoin(observables).subscribe();
  }

  private subscribeToTechsUpdates(): void {
    this.techsService.techs$.subscribe((data) => {
      this.techs = data;
      Object.entries(this.techs).forEach((item) => {
        this.checkExistence(item[1].techs, item[0] as Technique);
      });
    });
  }

  private checkExistence(obj: Tech[], tech: Technique): void {
    if (obj.length === 0) return;
    this.techPages[tech].exists = true;
  }

  handleNext(pTech: Technique): void {
    const maxPage = Math.ceil(this.techsService.techs$.value[pTech].number / 3);
    if (this.techPages[pTech].page >= maxPage) {
      return;
    }
    this.techPages[pTech].page++;
    this.loadTechsForPage(pTech, this.techPages[pTech].page);
  }

  handlePrev(pTech: Technique): void {
    if (this.techPages[pTech].page <= 1) return;

    this.techPages[pTech].page--;
    this.loadTechsForPage(pTech, this.techPages[pTech].page);
  }

  private loadTechsForPage(pTech: Technique, page: number): void {
    this.techsService
      .getTechsCategorized(String(page), pTech)
      .pipe(first())
      .subscribe((data) => {
        this.techs = { ...this.techs, ...data };
      });
  }

  handleFilter(filterParams: Partial<TechsFilter>) {
    if (!this.isFiltered) this.isFiltered = true;
    this.toggleFilterVisibility();
    const searchParams = new URLSearchParams(filterParams).toString();
    searchParams.replaceAll('+', '-');
    this.techsService
      .getTechsFiltered(searchParams)
      .pipe()
      .subscribe({
        next: (data) => {
          return (this.filteredTechs = data);
        },

        // Comentado para implementar a futuro
        // error: (error) => {
        //   this.errorModal = true;
        //   this.modalService.errorModal.next(true);
        //   console.log(error);
        // }
      });

    // Comentado para implementar a futuro
    // catchError((error) => {
    //   this.modalService.errorModal.next(true);
    //   return throwError(() => new Error('Failed to load techs', error));
    // })
  }

  showAllTechs() {
    this.isFiltered = !this.isFiltered;
  }

  toggleFilterVisibility() {
    this.isFilterVisible = !this.isFilterVisible;
  }
}
