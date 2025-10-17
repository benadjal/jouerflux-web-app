import { Component, inject, Input, OnInit } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SharedService } from '../../services/shared-service';

@Component({
  selector: 'app-paginator',
  imports: [PaginatorModule],
  templateUrl: './paginator.html',
  styleUrl: './paginator.scss',
})
export class Paginator implements OnInit {
  sharedService = inject(SharedService);

  @Input() totalpage!: number;

  first = 0;
  rows = 10;

  ngOnInit() {
    this.sharedService.pageInit();
  }

  onPageChange(event: PaginatorState) {
    this.sharedService.pageChanged((event.page ?? 0) + 1);
  }
}
