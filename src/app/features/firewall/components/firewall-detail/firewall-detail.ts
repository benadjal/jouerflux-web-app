import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, switchMap } from 'rxjs';
import { FirewallService } from '../../services/firewall-service';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { PolicyService } from '../../../policies/services/policy-service';
import { PolicyDetail } from '../../../policies/models/policy.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedService } from '../../../../shared/services/shared-service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-firewall-detail',
  imports: [
    AsyncPipe,
    ButtonModule,
    TableModule,
    BadgeModule,
    ToastModule,
    ConfirmDialog,
  ],
  templateUrl: './firewall-detail.html',
  styleUrl: './firewall-detail.scss',
  providers: [ConfirmationService, MessageService],
})
export class FirewallDetail {
  route = inject(ActivatedRoute);
  firewallService = inject(FirewallService);
  policiesService = inject(PolicyService);
  confirmationService = inject(ConfirmationService);
  messageService = inject(MessageService);
  sharedService = inject(SharedService);

  firewall$ = combineLatest([
    this.route.params,
    this.sharedService.refreshTrigger$$,
  ]).pipe(
    switchMap(([params]) => this.firewallService.getFirewall(params['id'])),
    map((firewall) => {
      const totalRules = firewall.policies.reduce(
        (accumulator, curentValue) => accumulator + curentValue.rules.length,
        0,
      );
      return {
        ...firewall,
        totalRules,
      };
    }),
  );

  confirmDelete(event: Event, policy: PolicyDetail) {
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
}
