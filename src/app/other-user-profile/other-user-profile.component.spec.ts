import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../shared/shared.module';

import { OtherUserProfileComponent } from './other-user-profile.component';

describe('OtherUserProfileComponent', () => {
  let component: OtherUserProfileComponent;
  let fixture: ComponentFixture<OtherUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherUserProfileComponent],
      imports: [HttpClientTestingModule, SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(OtherUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
