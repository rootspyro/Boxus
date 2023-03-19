import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.179.0/http/server.ts";

import { initializeApp } from "https://esm.sh/v106/firebase@9.16.0/deno/app.js";
import { getStorage, ref, getDownloadURL, uploadBytes } from "https://esm.sh/v106/firebase@9.16.0/deno/storage.js";

import { corsHeaders } from '../_shared/cors.ts';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSxridcrthDoWM9nwJw5XjZUvoZoWN5ok",
  authDomain: "boxus-7f57e.firebaseapp.com",
  projectId: "boxus-7f57e",
  storageBucket: "boxus-7f57e.appspot.com",
  messagingSenderId: "84463048312",
  appId: "1:84463048312:web:a8df34f0360b7344333f8d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

serve(async (req) => {

  if (req.method == "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders
    });
  }

  console.log(req);
  const data = await req.blob();

  const staticRef = ref(storage, crypto.randomUUID());

  try {
    const resourceUrl = await uploadBytes(staticRef, await data.arrayBuffer(), { size: data.size, contentType: data.type }).then(async (snapshot: any) => {
      return new Response(await getDownloadURL(snapshot.ref), {
        status: 200,
        headers: {
          ...corsHeaders
        }
      });
    });

    return resourceUrl;
  } catch (error) {
    console.error(error);
    return new Response(`${error}, ${staticRef}, ${data}`, {
      status: 502,
      headers: corsHeaders,
    })
  }

})
