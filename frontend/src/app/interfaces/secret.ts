export interface Secret {
  title: string;
  content: string;
  media_url: string;
  user_id: string;
}

export interface FullSecret extends Secret {
  created_at: string;
  id: number
  status: string;
}