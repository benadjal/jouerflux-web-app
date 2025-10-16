import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { FirewallService } from '../../services/firewall-service';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-firewall-detail',
  imports: [AsyncPipe, ButtonModule],
  templateUrl: './firewall-detail.html',
  styleUrl: './firewall-detail.scss'
})
export class FirewallDetail {
  route = inject(ActivatedRoute);
  firewallService = inject(FirewallService);

  firewall$ = this.route.params.pipe(
    switchMap((params) => this.firewallService.getFirewall(params['id'])),
    map((firewall) => {
      const totalRules = firewall.policies.reduce((accumulator,curentValue) => accumulator + curentValue.rules.length,0);
      return {
        ...firewall,
        totalRules
      }
    })  
  )
}
