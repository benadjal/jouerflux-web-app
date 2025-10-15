import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  refreshTrigger$$ = new BehaviorSubject<void>(undefined);

  refresh() {
    this.refreshTrigger$$.next();
  }
}
