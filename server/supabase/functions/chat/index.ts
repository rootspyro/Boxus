import { SUPABASE_KEY, SUPABASE_URL } from '../_shared/config.ts';
import { serve } from 'https://deno.land/std@0.179.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

import { corsHeaders } from '../_shared/cors.ts';

// Set your Supabase environment variables
const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_KEY;

// Create a Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

type Chat = {
  id: number;
  created_at: string;
  user_2: string;
  user_1: string;
  purpose_secret: string;
}

type Message = {
  content: string;
  created_at: string;
}

interface ChatData {
  chat: Chat;
  messages: Message[];
  secret_img: string;
}

// Define the function that will be executed when the server receives a request
async function handler(req: Request) {

  if (req.method == "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders
    });
  }
  // Get the user ID from the request
  const reqUrl = req.url;
  const reqURLWithParams = new URL(reqUrl);
  const searchParams =  new URLSearchParams(reqURLWithParams.search);

  // Get the user data from the database
  const userId = searchParams.get('id')
  const offset = parseInt(searchParams.get('offset') ?? '0');


  // Get the latest chats from the user
  const { data: latestChats, error } = await supabase.from("chat").select('*').or(`user_1.eq.${userId},user_2.eq.${userId}`).range(offset,offset+9) as unknown as { data: Chat[], error?: Error };

  // ChatData to return
  const chatData: ChatData[] = await Promise.all(latestChats.map(async (chat) => {
    // Getting the last message and his created_at property
    const { data: message, error: errorMessage } = await supabase.from('chat_messages').select('message,created_at').eq('chat_id', chat.id).limit(1).maybeSingle();
    // Getting the secret media_url
    const { data: purposeSecretMediaUrl, error: errorSecretMediaUrl } = await supabase.from('secrets').select('media_url').eq('id', chat.purpose_secret).maybeSingle();


    if (errorMessage || errorSecretMediaUrl) throw new Error('Error fetching content from supabase', { cause: errorMessage || errorSecretMediaUrl });
    // Returning the chat data
    return {
      chat,
      messages: [message] as unknown as Message[],
      secret_img: purposeSecretMediaUrl?.media_url as string,
    } satisfies ChatData;
  })).then(data => data);

  // If there was an error, return it
  if (error) {
    return new Response(JSON.stringify(error), { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders }})
  }

  // Return the user data
  return new Response(JSON.stringify(chatData), { status: 200, headers: corsHeaders })
}

// Serve the function
serve(handler)

