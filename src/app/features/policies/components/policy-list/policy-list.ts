import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { TableModule } from 'primeng/table';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PolicyService } from '../../services/policy-service';
import { DialogAddPolicy } from '../policy-create-form-dialog/policy-create-form-dialog';
import { SharedService } from '../../../../shared/services/shared-service';
import { switchMap } from 'rxjs';
import { Policy } from '../../models/policy.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-policy-list',
  imports: [
    AsyncPipe,
    TableModule,
    ButtonModule,
    ChipModule,
    BadgeModule,
    ConfirmDialog,
    ToastModule,
    DialogAddPolicy,
    RouterLink
  ],
  providers: [ConfirmationService, MessageService],

  templateUrl: './policy-list.html',
  styleUrl: './policy-list.scss',
})
export class PolicieList {
  confirmationService = inject(ConfirmationService);
  messageService = inject(MessageService);
  policiesService = inject(PolicyService);
  sharedService = inject(SharedService);

  isVisibleDialog = false;

  policies$ = this.sharedService.refreshTrigger$$.pipe(
    switchMap(() => this.policiesService.getAllPolicies()),
  );

  confirmDelete(event: Event, policy: Policy) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Souhaitez-vous vraiment supprimer :${policy.name} ?`,
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
        this.policiesService.deletePolicy(policy.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Suppression confirmée',
              detail: `La politique ${policy.name} a bien été supprimée`,
            });
            this.sharedService.refresh();
          },
          error: (err) => {
            console.error(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: `Erreur lors de la suppression de ${policy.name}`,
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

  showDialog() {
    this.isVisibleDialog = true;
  }

  closeDialog() {
    this.isVisibleDialog = false;
  }
}
