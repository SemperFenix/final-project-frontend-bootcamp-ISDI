import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  MyTechsList,
  MyTechsPage,
  Techniques,
  techsListed,
} from 'src/types/tech';
import { TechsService } from '../services/techs.service';

@Component({
  selector: 'app-techs-list',
  templateUrl: './techs-list.component.html',
  styleUrls: ['./techs-list.component.scss'],
})
export class TechsListComponent {
  techs$: Observable<MyTechsList>;
  page: MyTechsPage;
  techsToSearch: Techniques[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  proto: Array<any>;

  constructor(private techsService: TechsService) {
    this.techsToSearch = techsListed;
    this.proto = this.techsToSearch.map((item) => ({ [item]: 1 }));
    this.page = this.proto.reduce((obj, item) => ({ ...obj, ...item }));
    this.proto = techsListed.map((item) =>
      this.techsService.getTechsCategorized('1', item)
    );
    this.techs$ = this.proto.reduce((obj, item) => ({ ...obj, ...item }));
  }
}
