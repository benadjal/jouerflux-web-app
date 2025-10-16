import { Component, inject, Input, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { FirewallService } from '../../../firewall/services/firewallService';
import { Policy } from '../../models/policy.model';
import { SharedService } from '../../../../shared/services/shared-service';
import { MessageService } from 'primeng/api';
import { PolicyService } from '../../services/policy-service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AsyncPipe } from '@angular/common';
import { Firewall } from '../../../firewall/models/firewall.model';

@Component({
  selector: 'app-dialog-add-policy',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    MessageModule,
    AutoCompleteModule,
    AsyncPipe,
    FormsModule,
  ],
  templateUrl: './dialog-add-policy.html',
  styleUrl: './dialog-add-policy.scss',
})
export class DialogAddPolicy {
  firewallService = inject(FirewallService);
  policyService = inject(PolicyService);
  sharedService = inject(SharedService);

  messageService = inject(MessageService);

  @Input() visible = false;

  triggerCloseDialog = output<boolean>();


  firewall$ = this.firewallService.getAllFirewalls();

  policyForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    firewall_id: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  filteredFirewalls: Firewall[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterFirewalls(event: any, firewalls: Firewall[]) {
    const query = event.query?.toLowerCase() ?? '';
    this.filteredFirewalls = firewalls.filter((f) =>
      f.name.toLowerCase().includes(query),
    );
    console.log(this.filteredFirewalls)
  }

  createPolicie() {
    console.log(this.policyForm)
    if (this.policyForm.valid) {
      this.policyService.addNewPolicy(this.policyForm.getRawValue()).subscribe({
        next: (newPolicy: Policy) => {
          this.sharedService.refresh();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Policy : ${newPolicy.name} créé avec succès`,
            life: 3000,
          });
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
      this.closeDialog();
    }
  }

  closeDialog() {
    this.policyForm.reset();
    this.triggerCloseDialog.emit(true);
  }
}
