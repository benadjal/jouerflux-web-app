import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { Policy } from '../../../policies/models/policy.model';
import { FirewallService } from '../../../firewall/services/firewall-service';
import { PolicyService } from '../../../policies/services/policy-service';
import { SharedService } from '../../../../shared/services/shared-service';
import { MessageService } from 'primeng/api';
import { RuleService } from '../../services/rule-service';
import { Rule } from '../../models/rule.model';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-rule-create-form-dialog',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    MessageModule,
    AutoCompleteModule,
    AsyncPipe,
    FormsModule,
    SelectModule
  ],
  templateUrl: './rule-create-form-dialog.html',
  styleUrl: './rule-create-form-dialog.scss',
})
export class DialogAddRule {
  firewallService = inject(FirewallService);
  policyService = inject(PolicyService);
  sharedService = inject(SharedService);
  ruleService = inject(RuleService);

  messageService = inject(MessageService);

  @Input() visible = false;
  @Output() triggerCloseDialog = new EventEmitter();

  filteredPolicies: Policy[] = [];

  policies$ = this.policyService.getAllPolicies(0);

  ruleForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    policy_id: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  filterPolicies(event: AutoCompleteCompleteEvent, policies: Policy[]) {
    const query = event.query?.toLowerCase() ?? '';
    this.filteredPolicies = policies.filter((f) =>
      f.name.toLowerCase().includes(query),
    );
  }

  createRule() {
    this.ruleForm.markAllAsTouched();
    if (this.ruleForm.invalid) return;

    if (this.ruleForm.valid) {
      this.ruleService.addNewRule(this.ruleForm.getRawValue()).subscribe({
        next: (createdRule: Rule) => {
          this.sharedService.refresh();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Règle : ${createdRule.name} créé avec succès`,
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
  }

  closeDialog() {
    this.ruleForm.reset();
    this.triggerCloseDialog.emit(true);
  }
}
