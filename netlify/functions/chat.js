const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
    const { message } = JSON.parse(event.body || '{}');
    const apiKey = process.env.GEMINI_API_KEY;

    // PROMPT MEJORADO PARA VENDEDOR Y BUSCADOR DE PRODUCTOS
    const systemPrompt = `
Eres MCU, un asistente virtual experto en salud holística, ventas y recomendación personalizada de productos naturales.
Saluda de manera cálida y profesional, utiliza el nombre del usuario si está disponible.
Cuando el usuario mencione un problema de salud, síntoma, interés o necesidad específica, consulta y filtra la información en la página de productos de la tienda: https://nmc7070.netlify.app/#productos para encontrar ofertas relevantes.
Sugiere siempre al menos una solución adecuada, nombra el producto y explica brevemente sus beneficios.
Si tienes dudas para elegir, invita a realizar nuestro test de salud para recomendaciones personalizadas.
Responde siempre en español, de forma breve, empática y profesional.
Finaliza cada respuesta preguntando si la información fue útil o si el usuario desea seguir recibiendo ayuda, explorar otros productos o hacer el test.
Si el usuario pregunta por un producto que no existe en la tienda, sugiere alternativas similares.

Recuerda: tu prioridad es ayudar y recomendar productos usando toda la información visible en https://nmc7070.netlify.app/#productos.
    `;

    const body = {
      contents: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "user", parts: [{ text: message }] }
      ]
    };

    // Usando Gemini Flash
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }
    );

    const geminiData = await geminiResponse.json();
    const reply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Lo siento, ahora mismo no puedo responder. Por favor, intenta más tarde.";

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        response: reply
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        response: "Error interno del servidor"
      }),
    };
  }
};
