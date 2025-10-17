import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  refreshTrigger$$ = new BehaviorSubject<void>(undefined);

  paginatorTriggered$$ = new BehaviorSubject<number>(0);

  pageChanged(pageSelected: number) {
    this.paginatorTriggered$$.next(pageSelected);
  }

  pageInit() {
    this.paginatorTriggered$$.next(0);
  }

  refresh() {
    this.refreshTrigger$$.next();
  }
}
