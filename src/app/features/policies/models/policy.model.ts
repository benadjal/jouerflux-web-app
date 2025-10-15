export interface Policy {
  firewall_id: number;
  id: number;
  name: string;
}

export interface PolicyListResponse {
  current_page: number;
  items: Policy[];
  next_page: number;
  prev_page: number | null;
  total_pages: number;
}

