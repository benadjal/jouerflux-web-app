import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Policy, PolicyListResponse } from '../models/policy.model';
import {
  forkJoin,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SharedService } from '../../../shared/services/shared-service';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  http = inject(HttpClient);
  sharedService = inject(SharedService);

  createPolicy(policy: Omit<Policy, 'id'>): Observable<Policy> {
    return this.http.post<Policy>(`${environment.apiURL}/policies`, policy);
  }

  getAllPolicies(pageNumber: number): Observable<PolicyListResponse> {
    return this.http.get<PolicyListResponse>(`${environment.apiURL}/policies`, {
      params: {
        page: pageNumber,
      },
    });
  }

  deletePolicy(policyId: number) {
    return this.http.delete(`${environment.apiURL}/policies/${policyId}`);
  }

  allPoliciesWithoutPagination$ = this.sharedService.refreshTrigger$$.pipe(
    switchMap(() =>
      this.getAllPolicies(1).pipe(
        switchMap((firstPage) => {
          const totalPages = firstPage.total_pages;
          const requests = [];
          for (let i = 2; i <= totalPages; i++) {
            requests.push(this.getAllPolicies(i));
          }
          return forkJoin([of(firstPage), ...requests]);
        }),
        map((responses: PolicyListResponse[]) =>
          responses.flatMap((res) => res.items),
        ),
      ),
    ),
    tap((res) => console.log(res)),
    shareReplay(1),
  );
}
