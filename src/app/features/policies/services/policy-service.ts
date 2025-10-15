import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Policy, PolicyListResponse } from '../models/policy.model';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  http = inject(HttpClient);

  addNewPolicy(fireWall: Omit<Policy, 'id'>): Observable<Policy> {
    return this.http.post<Policy>(
      `${environment.apiURL}/policies`,
      fireWall,
    );
  }

  getAllPolicies(): Observable<Policy[]> {
    return this.http
      .get<PolicyListResponse>(`${environment.apiURL}/policies`)
      .pipe(
        map(
          (firewallResponseApi: PolicyListResponse) =>
            firewallResponseApi.items,
        ),
      );
  }
}
