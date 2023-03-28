import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalHandlerService } from 'src/app/services/modal-handler.service';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss'],
})
export class ErrorModalComponent implements OnInit {
  @Input() errorMessage!: string;

  constructor(
    public modalService: ModalHandlerService,
    private router: Router
  ) {}

  closeModal() {
    const modal = document.querySelector('dialog');
    modal?.close();
    this.modalService.errorModal.next(false);
    this.router.navigateByUrl('/techs');
  }

  ngOnInit(): void {
    const modal = document.querySelector('dialog');
    modal?.showModal();
  }
}
