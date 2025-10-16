import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Rule, RuleListResponse } from '../models/rule.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RuleService {
    http = inject(HttpClient);

    getAllRules() : Observable<Rule[]> {
        return this.http
            .get<RuleListResponse>(`${environment.apiURL}/rules`)
            .pipe(
              map(
                (firewallResponseApi: RuleListResponse) =>
                  firewallResponseApi.items,
              ),
            ); 
    }

}
