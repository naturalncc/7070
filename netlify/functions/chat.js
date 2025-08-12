const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const { message } = JSON.parse(event.body);
    const apiKey = process.env.GEMINI_API_KEY;

    // Prompt optimizado para Gemini 1.5 Flash
    const systemPrompt = `
Eres MCU, un asistente de salud holística. Responde en español de forma breve y útil.
Cuando el usuario mencione síntomas o necesidades:
1. Recomienda productos específicos de https://nmc7070.netlify.app/#productos.
2. Si no hay información clara, sugiere hacer un test de salud.
Mantén respuestas bajo 3 líneas.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `${systemPrompt}\n\nUsuario: ${message}` }]
          }]
        })
      }
    );

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text 
      || "Por favor, reformula tu pregunta o intenta más tarde.";

    return { statusCode: 200, body: JSON.stringify({ success: true, response: reply }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ 
      success: false, 
      response: "Error técnico. Intenta nuevamente o contacta al equipo."
    })};
  }
};
