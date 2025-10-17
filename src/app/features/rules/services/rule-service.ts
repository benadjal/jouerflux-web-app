import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rule, RuleListResponse } from '../models/rule.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RuleService {
  http = inject(HttpClient);

  getAllRules(pageNumber : number): Observable<RuleListResponse> {
    return this.http
      .get<RuleListResponse>(`${environment.apiURL}/rules`,{
        params : {
          page : pageNumber
        }
      });
  }

  addNewRule(rule: Omit<Rule, 'id'>): Observable<Rule> {
    return this.http.post<Rule>(`${environment.apiURL}/rules`, rule);
  }

  deleteRule(ruleId: number) {
    return this.http.delete(`${environment.apiURL}/rules/${ruleId}`);
  }
}
