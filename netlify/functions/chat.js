import fetch from 'node-fetch';

export const handler = async (event) => {
  try {
    const { message } = JSON.parse(event.body || '{}');
    
    // Respuesta estática de prueba (reemplázalo con tu lógica real)
    const reply = message 
      ? `Recibí tu mensaje: "${message}". [Respuesta simulada]` 
      : "Envía un mensaje válido.";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error interno" }),
    };
  }
};
