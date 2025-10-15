import { Component, inject, Input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FirewallService } from '../../services/firewallService';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { Firewall } from '../../models/firewall.model';

@Component({
  selector: 'app-dialog-add-firewall',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    MessageModule,
  ],
  templateUrl: './dialog-add-firewall.html',
  styleUrl: './dialog-add-firewall.scss',
})
export class DialogAddFirewall {
  @Input() visible = false;

  triggerCloseDialog = output<boolean>();

  firewallService = inject(FirewallService);

  messageService = inject(MessageService);

  firewallForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
  });

  createFirewall() {
    if (this.firewallForm.valid) {
      this.firewallService
        .addNewFirewall(this.firewallForm.getRawValue())
        .subscribe({
          next: (newFirewall : Firewall) => {
            this.firewallService.refresh();
            this.closeDialog();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `Firewall : ${newFirewall.name} créé avec succès`,
              life: 3000,
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: error.error.message,
              life: 3000,
            });          },
        });
    }
  }

  closeDialog() {
    this.firewallForm.reset();
    this.triggerCloseDialog.emit(true);
  }
}
