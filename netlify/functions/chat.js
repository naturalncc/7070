exports.handler = async (event, context) => {
  try {
    const { message } = JSON.parse(event.body || '{}');
    // Aquí puedes poner la lógica para llamar a Gemini o lo que quieras.
    // Por ahora solo responde fijo.
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        response: `¡Recibí tu mensaje: "${message}"! Este es solo un ejemplo de respuesta desde el backend.`
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
