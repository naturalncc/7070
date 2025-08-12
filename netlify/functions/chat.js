// netlify/functions/chat.js
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hola desde /chat" }),
  };
};
