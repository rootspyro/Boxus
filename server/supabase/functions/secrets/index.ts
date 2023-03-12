import { SUPABASE_KEY, SUPABASE_URL } from '../_shared/config.ts';
import * as postgres from 'https://deno.land/x/postgres@v0.14.2/mod.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import * as mod from 'https://deno.land/std@0.179.0/http/server.ts';
import { router } from 'https://deno.land/x/rutt@0.1.0/mod.ts';

import { corsHeaders } from '../_shared/cors.ts';

const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function getSecrets() {
  const { data: secrets, error } = await supabase.from('secrets').select('*');
  if (error) throw new Error(`${error.code} ${error.details} ${error.hint} ${error.message}`);
  return secrets;
}

async function getSecret(secretId: number) {
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
  'GET@/secrets/:id': async function (req) {
    const secretId = req.url.split('/').at(-1);

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
      throw new Error('secretId not defined')

    } catch (error) {
      return new Response('Something went wrong, error: ' + error, {
        status: 500
      })
    }

  },
  'POST@/secrets': async function (req) {

    const databaseUrl =  Deno.env.get('DATABASE_URL')!
    const pool = new postgres.Pool(databaseUrl, 3, true)
    
    interface payload {
      title: string;
      content: string;
      media_url: string;
      user_id: string;
    }

    try {

      const data : payload = await req.json()

      // Grab a connection from the pool
      const connection = await pool.connect()

      try {
        // Run a query
        const result = await connection.queryObject`INSERT INTO secrets(title, content, media_url, user_id ) VALUES(${data.title},${data.content},${data.media_url}, ${data.user_id}) returning id, title`
        const secrets = result.rows // [{ id: 1, name: "Lion" }, ...]


        // Encode the result as pretty printed JSON
        const body = JSON.stringify(secrets,
          (key, value) => (typeof value === 'bigint' ? value.toString() : value),
          2
        )

        // Return the response with the correct content type header
        return new Response(body, {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            ...corsHeaders
          },
        })
      } finally {
        // Release the connection back into the pool
        connection.release()
      }
    } catch (err) {
      console.error(err)
      return new Response(String(err?.message ?? err), { status: 500 })
    }

  }
})

mod.serve(handler);
