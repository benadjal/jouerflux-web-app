import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FirewallService } from '../../services/firewall-service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { Firewall } from '../../models/firewall.model';
import { SharedService } from '../../../../shared/services/shared-service';

@Component({
  selector: 'app-firewall-create-form-dialog',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    MessageModule,
  ],
  templateUrl: './firewall-create-form-dialog.html',
  styleUrl: './firewall-create-form-dialog.scss',
})
export class DialogAddFirewall {
  @Input() isVisibleDialog = false;
  @Output() triggerCloseDialog = new EventEmitter();

  firewallService = inject(FirewallService);

  messageService = inject(MessageService);

  sharedService = inject(SharedService);

  firewallForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
  });

  createFirewall() {
    this.firewallForm.markAllAsTouched();
    if (this.firewallForm.invalid) return;

    this.firewallService
      .createFirewall(this.firewallForm.getRawValue())
      .subscribe({
        next: (createdFirewall: Firewall) => {
          this.sharedService.refresh();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Firewall : ${createdFirewall.name} créé avec succès`,
            life: 3000,
          });
          this.closeDialog();
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: error.error.message,
            life: 3000,
          });
        },
      });
  }

  closeDialog() {
    this.firewallForm.reset();
    this.triggerCloseDialog.emit(true);
  }
}
