import { Routes } from '@angular/router';
import { FirewallList } from './features/firewall/components/firewall-list/firewall-list';
import { PolicieList } from './features/policies/components/policy-list/policy-list';
import { RuleList } from './features/rules/components/rule-list/rule-list';
import { FirewallDetail } from './features/firewall/components/firewall-detail/firewall-detail';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/firewalls' },
  { path: 'firewalls', component: FirewallList },
  { path: 'policies', component: PolicieList },
  { path: 'rules', component: RuleList },
  { path: 'firewall/:id', component: FirewallDetail },
];
