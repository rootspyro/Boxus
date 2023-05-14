export interface ChatData {
  chat: Chat;
  messages: string[];
}

export interface Chat {
  id: number;
  created_at: string;
  user_1: string;
  user_2: string;
  purpose_secret: string;
}
