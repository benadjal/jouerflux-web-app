import { Component, inject } from '@angular/core';
import { FirewallService } from '../../services/firewallService';
import { AsyncPipe } from '@angular/common';
import { FirewallForm } from '../firewall-form/firewall-form';
import { switchMap } from 'rxjs';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-firewall-list',
  imports: [AsyncPipe,FirewallForm,TableModule,ButtonModule,ChipModule,BadgeModule],
  templateUrl: './firewall-list.html',
  styleUrl: './firewall-list.scss'
})
export class FirewallList { 

  fireWallService = inject(FirewallService);

  firewallList$ = this.fireWallService.refreshTrigger$$.pipe(
    switchMap(() => this.fireWallService.getAllFirewalls())
  )
}
