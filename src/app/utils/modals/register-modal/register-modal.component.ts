import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalHandlerService } from 'src/app/services/modal-handler.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.sass'],
})
export class RegisterModalComponent implements OnInit {
  constructor(
    public modalService: ModalHandlerService,
    private router: Router
  ) {}

  closeModal() {
    const modal = document.querySelector('dialog');
    modal?.close();
    this.modalService.registerModal(false);
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    const modal = document.querySelector('dialog');
    modal?.showModal();
  }
}
