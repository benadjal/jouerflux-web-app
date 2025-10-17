import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
import { FirewallService } from '../../../firewall/services/firewall-service';
import { Policy } from '../../models/policy.model';
import { SharedService } from '../../../../shared/services/shared-service';
import { MessageService } from 'primeng/api';
import { PolicyService } from '../../services/policy-service';
import { AsyncPipe } from '@angular/common';
import { Firewall } from '../../../firewall/models/firewall.model';
import { SelectModule } from 'primeng/select';
import { map } from 'rxjs';

@Component({
  selector: 'app-policy-create-form-dialog',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    MessageModule,
    AsyncPipe,
    FormsModule,
    SelectModule,
  ],
  templateUrl: './policy-create-form-dialog.html',
  styleUrls: ['./policy-create-form-dialog.scss'],
})
export class DialogAddPolicy implements OnInit {
  @Input() isVisibleDialog = false;
  @Input() firewallInput!: Firewall;

  @Output() triggerCloseDialog = new EventEmitter();

  ngOnInit() {
    if (this.firewallInput) {
      this.firewall$ = this.firewallService.allFirewallsWithoutPagination$.pipe(
        map((firewalls) =>
          firewalls.filter((fw) => fw.id === this.firewallInput!.id),
        ),
      );
      this.policyForm.patchValue({
        firewall_id: this.firewallInput.id.toString(),
      });
    } else {
      this.firewall$ = this.firewallService.allFirewallsWithoutPagination$;
    }
  }

  firewallService = inject(FirewallService);
  policyService = inject(PolicyService);
  sharedService = inject(SharedService);

  messageService = inject(MessageService);

  firewall$ = this.firewallService.allFirewallsWithoutPagination$;

  filteredFirewalls: Firewall[] = [];

  policyForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ],
    }),
    firewall_id: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  createPolicie() {
    this.policyForm.markAllAsTouched();
    if (this.policyForm.invalid) return;

    this.policyService.createPolicy(this.policyForm.getRawValue()).subscribe({
      next: (createdPolicy: Policy) => {
        this.sharedService.refresh();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Policy : ${createdPolicy.name} créé avec succès`,
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
    this.policyForm.reset();
    this.triggerCloseDialog.emit(true);
  }
}
