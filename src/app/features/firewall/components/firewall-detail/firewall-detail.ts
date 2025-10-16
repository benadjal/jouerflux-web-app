import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { FirewallService } from '../../services/firewall-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-firewall-detail',
  imports: [AsyncPipe],
  templateUrl: './firewall-detail.html',
  styleUrl: './firewall-detail.scss'
})
export class FirewallDetail {
  route = inject(ActivatedRoute);
  firewallService = inject(FirewallService);

  firewall$ = this.route.params.pipe(
    switchMap((params) => this.firewallService.getFirewall(params['id']))
  )
}
