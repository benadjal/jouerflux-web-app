import { Component, inject } from '@angular/core';
import { FirewallService } from '../../services/firewallService';
import { AsyncPipe } from '@angular/common';
import { switchMap } from 'rxjs';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';
import { DialogAddFirewall } from '../dialog-add-firewall/dialog-add-firewall';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Firewall } from '../../models/firewall.model';
import { SharedService } from '../../../../shared/services/shared-service';

@Component({
  selector: 'app-firewall-list',
  imports: [
    AsyncPipe,
    TableModule,
    ButtonModule,
    ChipModule,
    BadgeModule,
    DialogAddFirewall,
    ConfirmDialog,
    ToastModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './firewall-list.html',
  styleUrl: './firewall-list.scss',
})
export class FirewallList {
  openDialog = false;

  fireWallService = inject(FirewallService);

  sharedService = inject(SharedService)

  confirmationService = inject(ConfirmationService);

  messageService = inject(MessageService);

  firewallList$ = this.sharedService.refreshTrigger$$.pipe(
    switchMap(() => this.fireWallService.getAllFirewalls()),
  );

  showDialog() {
    this.openDialog = true;
  }

  closeDialog() {
    this.openDialog = false;
  }

  confirmDelete(event: Event, fireWall: Firewall) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Souhaitez-vous vraiment supprimer :${fireWall.name} ?`,
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
        this.fireWallService.deleteFirewalls(fireWall.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Suppression confirmée',
              detail: `Le firewall ${fireWall.name} a bien été supprimé`,
            });
            this.sharedService.refresh();
          },
          error: (err) => {
            console.error(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: `Erreur lors de la suppression de ${fireWall.name}`,
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
