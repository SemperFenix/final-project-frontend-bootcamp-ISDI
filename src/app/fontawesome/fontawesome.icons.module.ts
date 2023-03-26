import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faChevronLeft,
  faChevronRight,
  faListCheck,
  faPenNib,
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [],
  imports: [FontAwesomeModule, CommonModule],
  exports: [FontAwesomeModule],
})
export class FontawesomeIconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faChevronRight,
      faChevronLeft,
      faBars,
      faListCheck,
      faPenNib
    );
  }
}
