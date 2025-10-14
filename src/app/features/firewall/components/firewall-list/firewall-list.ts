import { Component, inject } from '@angular/core';
import { FirewallService } from '../../services/firewallService';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-firewall-list',
  imports: [AsyncPipe],
  templateUrl: './firewall-list.html',
  styleUrl: './firewall-list.scss'
})
export class FirewallList { 

  fireWallService = inject(FirewallService);

  firewallList$ = this.fireWallService.getAllFirewalls()
}
