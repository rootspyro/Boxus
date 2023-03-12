import { SUPABASE_KEY, SUPABASE_URL } from '../_shared/config.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import * as mod from 'https://deno.land/std@0.179.0/http/server.ts';
import { router } from 'https://deno.land/x/rutt@0.1.0/mod.ts';

import { corsHeaders } from '../_shared/cors.ts';

const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

interface payload {
  title: string;
  content: string;
  media_url: string;
  user_id: string;
}

async function getSecrets() {
  // Select all the secrets from the database in a range of 1000 by default
  //const { data: secrets, error } = await supabase.from('secrets').select('*');
  const { data: secrets, error } = await supabase.from('secrets').select('id, created_at, title, content, status').eq('status', 'CLOSED');
  if (error) throw new Error(`${error.code} ${error.details} ${error.hint} ${error.message}`);
  return secrets;
}

async function getSecret(secretId: number) {
  // Select just a single secret
  const { data: secrets, error } = await supabase.from('secrets').select('*').eq('id', secretId);
  if (error) throw new Error(`${error.code} ${error.details} ${error.hint} ${error.message}`);
  return secrets;
}

const handler = router({
  'GET@/secrets': async function (_req) {

    try {
      const secrets = await getSecrets();

      return new Response(JSON.stringify(secrets), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        },
      })

    } catch (error) {
      return new Response('Something went wrong, error: ' + error, {
        status: 500
      })
    }

  },
  'GET@/secrets/:id': async function (_req, _, { id }) {
    const secretId: string = id;
    try {
      if (secretId) {
        const numberSecretId = parseInt(secretId);
        const secret = await getSecret(numberSecretId);

        return new Response(JSON.stringify(secret), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          },
        })
      }

      throw new Error('secretId not defined');

    } catch (error) {
      return new Response('Something went wrong, error: ' + error, {
        status: 500
      })
    }

  },
  'POST@/secrets': async function (req) {

    try {
      const data : payload = await req.json()

        // Run a query to insert the data and other one to get it
        await supabase.from("secrets").insert(data);
        const result = await supabase.from("secrets").select("*").eq("title", data.title).eq("user_id", data.user_id);

        const body = JSON.stringify(result.data);

        // Return the response with the correct content type header
        return new Response(body, {
          status: result.status,
          statusText: result.statusText,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            ...corsHeaders
          },
        })

    } catch (err) {
      console.error(err)
      return new Response(String(err?.message ?? err), { status: 500 })
    }

  },
  'OPTIONS@/secrets': function(_req) {
    return new Response('ok', { headers: corsHeaders })
  },
  '*': function (_req) {
    return new Response('Not implemented', {
      status: 501,
    })
  }
})

mod.serve(handler);
