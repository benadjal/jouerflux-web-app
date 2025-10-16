import { Rule } from "../../rules/models/rule.model";

export interface Policy {
  firewall_id: string;
  id: number;
  name: string;
}

export interface PolicyDetail extends Policy {
  rules : Rule[];
}

export interface PolicyListResponse {
  current_page: number;
  items: Policy[];
  next_page: number;
  prev_page: number | null;
  total_pages: number;
}

