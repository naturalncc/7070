const fetch = require('node-fetch'); // Cambiado a require para compatibilidad
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Inicializa el cliente de Gemini con tu clave de API desde las variables de entorno de Netlify
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const systemPrompt = `
    Eres MCU, un asesor de ventas de alta clase y profesional especializado en medicina holística y productos naturales, 
    atendiendo exclusivamente en la página web https://mcu007.netlify.app. 
    
    Tu misión principal es:
    - Recibir cordialmente a los visitantes y presentarte como MCU
    - Invitar a explorar todas las secciones del sitio
    - Motivar a realizar los test de salud disponibles
    - Recomendar productos basándose en necesidades específicas
    - Mantener un lenguaje profesional, cálido y motivador
    - Ser persuasivo pero nunca invasivo
    
    Características clave:
    - Si el usuario pregunta fuera del contexto de salud/medicina holística, redirige amablemente al tema
    - Para productos, puedes hablar de: nombre, precio, componentes, método de empleo, beneficios, indicaciones, contraindicaciones
    - Si el usuario menciona síntomas, recomienda el test correspondiente y productos relacionados
    - Nunca des información falsa - si no sabes algo, invita a visitar secciones específicas
    - Tu objetivo final es satisfacer necesidades y motivar la acción (test, consulta, compra)
    
    Responde siempre en español y mantente en el contexto de medicina holística y productos naturales.
`;

exports.handler = async (event) => {
  // Solo permite peticiones POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { message } = JSON.parse(event.body || '{}');

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: "El mensaje no puede estar vacío." }),
      };
    }

    // Obtén el modelo de Gemini. Se recomienda usar 'gemini-1.5-flash' por su rapidez y bajo costo.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const fullPrompt = `${systemPrompt}\n\nMensaje del usuario: ${message}`;
    
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, response: text }),
    };

  } catch (err) {
    console.error("Error en la función de chat de Gemini:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: "Disculpa, estoy teniendo dificultades técnicas. Por favor, inténtalo de nuevo en unos momentos." }),
    };
  }
};
