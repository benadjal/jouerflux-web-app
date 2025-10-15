import { Routes } from '@angular/router';
import { FirewallList } from './features/firewall/components/firewall-list/firewall-list';
import { PolicieList } from './features/policies/components/policie-list/policie-list';
import { RuleList } from './features/rules/components/rule-list/rule-list';

export const routes: Routes = [
  { path: '', component: FirewallList },
  { path: 'policies', component: PolicieList },
  { path: 'rules', component: RuleList },
];
