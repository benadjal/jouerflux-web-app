export interface Firewall {
  id: number;
  name: string;
}

export interface FirewallListResponse {
  current_page: number;
  items: Firewall[];
  next_page: number;
  prev_page: number | null;
  total_pages: number;
}
