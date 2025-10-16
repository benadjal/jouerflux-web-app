export interface Rule {
  policy_id: string;
  id: number;
  name: string;
}

export interface RuleListResponse {
  current_page: number;
  items: Rule[];
  next_page: number;
  prev_page: number | null;
  total_pages: number;
}

