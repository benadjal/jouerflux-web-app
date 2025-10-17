import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Policy, PolicyListResponse } from '../models/policy.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  http = inject(HttpClient);

  createPolicy(policy: Omit<Policy, 'id'>): Observable<Policy> {
    return this.http.post<Policy>(`${environment.apiURL}/policies`, policy);
  }

  getAllPolicies(pageNumber: number): Observable<PolicyListResponse> {
    return this.http
      .get<PolicyListResponse>(`${environment.apiURL}/policies`, {
        params : {
          page : pageNumber
        }
      });
  }

  deletePolicy(policyId: number) {
    return this.http.delete(`${environment.apiURL}/policies/${policyId}`);
  }
}
