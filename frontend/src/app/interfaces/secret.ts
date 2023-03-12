import { Session } from "@supabase/supabase-js";

export interface Secret {
  title: string;
  content: string;
  media_url: File;
  user_id: string | undefined;
}
