import { Component, inject } from '@angular/core';
import { FirewallService } from '../../services/firewallService';
import { AsyncPipe } from '@angular/common';
import { switchMap } from 'rxjs';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';
import { DialogAddFirewall } from '../dialog-add-firewall/dialog-add-firewall';

@Component({
  selector: 'app-firewall-list',
  imports: [
    AsyncPipe,
    TableModule,
    ButtonModule,
    ChipModule,
    BadgeModule,
    DialogAddFirewall
  ],
  templateUrl: './firewall-list.html',
  styleUrl: './firewall-list.scss',
})
export class FirewallList {
  openDialog = false;

  fireWallService = inject(FirewallService);

  firewallList$ = this.fireWallService.refreshTrigger$$.pipe(
    switchMap(() => this.fireWallService.getAllFirewalls()),
  );

  showDialog() {
    this.openDialog = true;
  }

  closeDialog() {
    this.openDialog = false;
  }
}
