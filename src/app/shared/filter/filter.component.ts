import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Grades, gradesListed } from 'src/types/aikido.user';
import {
  Attack,
  attacksListed,
  Stand,
  standsListed,
  Technique,
  TechsFilter,
  techsListed,
} from 'src/types/tech';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  filterOptions: FormGroup;
  @Output() itSubmit = new EventEmitter<Partial<TechsFilter>>();
  attacks: Attack[] = attacksListed;
  techs: Technique[] = techsListed;
  stands: Stand[] = standsListed;
  grades: Grades[] = gradesListed;

  constructor(private formBuilder: FormBuilder) {
    this.filterOptions = formBuilder.group({
      attack: [''],
      tech: [''],
      stand: [''],
      grade: [''],
    });
  }

  changeField(ev: Event, string: string) {
    this.filterOptions
      .get(string)
      ?.setValue((ev.target as HTMLInputElement).value, { onlySelf: true });
    console.log(this.filterOptions.value);
  }

  sendToParent() {
    console.log(this.filterOptions.value);
    const preFilter = Object.entries(this.filterOptions.value).filter(
      (item) => item[1] !== '' && item[1] !== null
    );
    const filter = Object.fromEntries(preFilter) as Partial<TechsFilter>;
    this.filterOptions.reset();
    this.itSubmit.emit(filter);
  }
}
