import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Firewall,
  FirewallDetail,
  FirewallListResponse,
} from '../models/firewall.model';
import {
  forkJoin,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
} from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SharedService } from '../../../shared/services/shared-service';

@Injectable({
  providedIn: 'root',
})
export class FirewallService {
  http = inject(HttpClient);
  sharedService = inject(SharedService);

  getAllFirewalls(pageNumber: number): Observable<FirewallListResponse> {
    return this.http.get<FirewallListResponse>(
      `${environment.apiURL}/firewalls`,
      {
        params: {
          page: pageNumber,
        },
      },
    );
  }

  createFirewall(fireWall: Omit<Firewall, 'id'>): Observable<Firewall> {
    return this.http.post<Firewall>(
      `${environment.apiURL}/firewalls`,
      fireWall,
    );
  }

  getFirewall(id: number): Observable<FirewallDetail> {
    return this.http
      .get<FirewallDetail>(`${environment.apiURL}/firewalls/${id}`)
  }

  deleteFirewall(firewallId: number) {
    return this.http.delete(`${environment.apiURL}/firewalls/${firewallId}`);
  }

  allFirewallsWithoutPagination$ = this.sharedService.refreshTrigger$$.pipe(
    switchMap(() =>
      this.getAllFirewalls(1).pipe(
        switchMap((firstPage) => {
          const totalPages = firstPage.total_pages;
          const requests = [];
          for (let i = 2; i <= totalPages; i++) {
            requests.push(this.getAllFirewalls(i));
          }
          return forkJoin([of(firstPage), ...requests]);
        }),
        map((responses: FirewallListResponse[]) =>
          responses.flatMap((res) => res.items),
        ),
      ),
    ),
    shareReplay(1),
  )
}
