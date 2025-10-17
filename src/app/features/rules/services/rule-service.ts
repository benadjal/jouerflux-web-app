import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  forkJoin,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { Rule, RuleListResponse } from '../models/rule.model';
import { environment } from '../../../../environments/environment';
import { SharedService } from '../../../shared/services/shared-service';

@Injectable({
  providedIn: 'root',
})
export class RuleService {
  http = inject(HttpClient);
  sharedService = inject(SharedService);

  getAllRules(pageNumber: number): Observable<RuleListResponse> {
    return this.http.get<RuleListResponse>(`${environment.apiURL}/rules`, {
      params: {
        page: pageNumber,
      },
    });
  }

  addNewRule(rule: Omit<Rule, 'id'>): Observable<Rule> {
    return this.http.post<Rule>(`${environment.apiURL}/rules`, rule);
  }

  deleteRule(ruleId: number) {
    return this.http.delete(`${environment.apiURL}/rules/${ruleId}`);
  }

  allRulesWithoutPagination$ = this.sharedService.refreshTrigger$$.pipe(
    switchMap(() =>
      this.getAllRules(1).pipe(
        switchMap((firstPage) => {
          const totalPages = firstPage.total_pages;
          const requests = [];
          for (let i = 2; i <= totalPages; i++) {
            requests.push(this.getAllRules(i));
          }
          return forkJoin([of(firstPage), ...requests]);
        }),
        map((responses: RuleListResponse[]) =>
          responses.flatMap((res) => res.items),
        ),
      ),
    ),
    tap((res) => console.log(res)),
    shareReplay(1),
  );
}
