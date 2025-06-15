
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set in Supabase secrets.");
    }

    const { prompt, healthProfile } = await req.json()

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`

    let systemInstruction = `You are MediQueue, a friendly and helpful AI health assistant. Your goal is to provide general health information and guidance.

IMPORTANT: You are not a doctor. Always end your responses with a clear disclaimer: "Please remember, I am an AI assistant and not a medical professional. Consult with a qualified healthcare provider for any medical advice, diagnosis, or treatment."

If a user asks about booking an appointment, suggest specialties they might need based on their query and inform them that the platform can help them find and book with available doctors.
If a user mentions an emergency or urgent situation, you MUST instruct them to call their local emergency number (e.g., 108 in India, 911 in the US) or go to the nearest emergency room immediately. This is critical.

Keep your responses concise, clear, and empathetic.`
    
    if (healthProfile) {
      systemInstruction += `\n\nHere is some context about the user's health profile. Use this to provide more relevant, yet still general, guidance. Do not mention the specifics of their profile back to them unless it's directly relevant to their question:\n${JSON.stringify(healthProfile, null, 2)}`
    }

    const fullPrompt = `${systemInstruction}\n\n---\n\nUser Query: "${prompt}"`

    const requestBody = {
      contents: [{
        parts:[{
          text: fullPrompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
       safetySettings: [
        { "category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE" },
        { "category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE" },
        { "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE" },
        { "category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE" }
      ]
    };

    const geminiResponse = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })

    if (!geminiResponse.ok) {
        const errorBody = await geminiResponse.text();
        console.error('Gemini API Error:', errorBody);
        throw new Error(`Gemini API request failed with status ${geminiResponse.status}`);
    }

    const responseData = await geminiResponse.json();
    
    if (responseData.promptFeedback && responseData.promptFeedback.blockReason) {
        console.error('Gemini API Blocked Prompt:', responseData.promptFeedback);
        throw new Error(`The request was blocked by the Gemini API. Reason: ${responseData.promptFeedback.blockReason}`);
    }

    const text = responseData.candidates[0]?.content?.parts[0]?.text || "I'm having trouble thinking right now. Please try again in a moment.";

    return new Response(JSON.stringify({ text }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error(error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
