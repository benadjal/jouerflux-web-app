import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FirewallService } from '../../services/firewallService';

@Component({
  selector: 'app-firewall-form',
  imports: [ReactiveFormsModule],
  templateUrl: './firewall-form.html',
  styleUrl: './firewall-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirewallForm {
  firewallService = inject(FirewallService);

  firewallForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
  });

  createFirewall() {
    if (this.firewallForm.valid) {
      this.firewallService.addNewFirewall(this.firewallForm.getRawValue()).subscribe({
        next: () => this.firewallService.refresh(),
        error : (err) => console.error(err)
      });
    }
  }
}
