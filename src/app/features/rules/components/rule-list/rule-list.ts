import { Component, inject } from '@angular/core';
import { Rule } from '../../models/rule.model';
import { switchMap } from 'rxjs';
import { SharedService } from '../../../../shared/services/shared-service';
import { RuleService } from '../../services/rule-service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AsyncPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogAddRule } from "../dialog-add-rule/dialog-add-rule";

@Component({
  selector: 'app-rule-list',
  imports: [
    AsyncPipe,
    TableModule,
    ButtonModule,
    ChipModule,
    BadgeModule,
    ConfirmDialog,
    ToastModule,
    DialogAddRule
],
  templateUrl: './rule-list.html',
  styleUrl: './rule-list.scss',
  providers: [ConfirmationService, MessageService],
})
export class RuleList {
  openDialog = false;

  confirmationService = inject(ConfirmationService);
  messageService = inject(MessageService);
  rulesService = inject(RuleService);
  sharedService = inject(SharedService);

  rules$ = this.sharedService.refreshTrigger$$.pipe(
    switchMap(() => this.rulesService.getAllRules()),
  );

  showDialog() {
    this.openDialog = true;
  }

  closeDialog() {
    this.openDialog = false;
  }

  confirmDelete(event: Event, rule: Rule) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Souhaitez-vous vraiment supprimer : ${rule.name} ?`,
      header: 'Confirmer la supression',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Annuler',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Supprimer',
        severity: 'danger',
      },

      accept: () => {
        this.rulesService.deleteRule(rule.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Suppression confirmée',
              detail: `La règle ${rule.name} a bien été supprimée`,
            });
            this.sharedService.refresh();
          },
          error: (err) => {
            console.error(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: `Erreur lors de la suppression de ${rule.name}`,
            });
          },
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Annulé',
          detail: 'Vous avez annulé la suppression',
        });
      },
    });
  }
}
