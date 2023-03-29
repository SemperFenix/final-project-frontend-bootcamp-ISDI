import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tech } from 'src/types/tech';

@Injectable({
  providedIn: 'root',
})
export class TechDetailsService {
  currentTech: BehaviorSubject<Tech>;
  constructor() {
    this.currentTech = new BehaviorSubject<Tech>({} as Tech);
  }
}
