import { TestBed } from '@angular/core/testing';

import { ModalHandlerService } from './modal-handler.service';

describe('ModalHandlerService', () => {
  let service: ModalHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('When call the setRegisterModal method', () => {
    it('set this.registerModal value', () => {
      expect(service.registerModal.value).toBeFalse();
      service.setRegisterModal(true);
      expect(service.registerModal.value).toBeTrue();
    });
  });

  describe('When call the setErrorModal method', () => {
    it('set this.errorModal value', () => {
      expect(service.errorModal.value).toBeFalse();
      service.setErrorModal(true);
      expect(service.errorModal.value).toBeTrue();
    });
  });
});
