import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Firewall, FirewallListResponse } from '../models/firewall.model';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirewallService {
  http = inject(HttpClient);

  getAllFirewalls(): Observable<Firewall[]> {
    return this.http
      .get<FirewallListResponse>(`${environment.apiURL}/firewalls`)
      .pipe(
        map(
          (firewallResponseApi: FirewallListResponse) =>
            firewallResponseApi.items,
        ),
      );
  }

  createFirewall(fireWall: Omit<Firewall, 'id'>): Observable<Firewall> {
    return this.http.post<Firewall>(
      `${environment.apiURL}/firewalls`,
      fireWall,
    );
  }

  deleteFirewall(firewallId: number) {
    return this.http.delete(`${environment.apiURL}/firewalls/${firewallId}`);
  }
}
