import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { TableModule } from 'primeng/table';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PolicyService } from '../../services/policy-service';

@Component({
  selector: 'app-policie-list',
  imports: [
    AsyncPipe,
    TableModule,
    ButtonModule,
    ChipModule,
    BadgeModule,
    ConfirmDialog,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],

  templateUrl: './policie-list.html',
  styleUrl: './policie-list.scss',
})
export class PolicieList {
  openDialog = false;

  confirmationService = inject(ConfirmationService);

  messageService = inject(MessageService);

  policiesService = inject(PolicyService)

  policies$ = this.policiesService.getAllPolicies();

  
}
