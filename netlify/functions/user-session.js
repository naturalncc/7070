// netlify/functions/user-session.js
const { createClient } = require('@supabase/supabase-js');

// Configuración con tus datos (usa variables de entorno en Netlify)
const supabaseUrl = 'https://xqdrghfepohivjpyhnlh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxZHJnaGZlcG9oaXZqcHlobmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NzAwODIsImV4cCI6MjA3MDE0NjA4Mn0.azzMA3b-KRiIEGQ-OqxrYkmHzdLSHg6uRrgFmaTUS0o';

const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
  // Extrae el token de sesión de las cookies o headers
  const token = event.headers.cookie?.split('sb-access-token=')[1]?.split(';')[0];

  if (!token) {
    return {
      statusCode: 401,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'No hay token de sesión' }),
    };
  }

  try {
    // Verifica la sesión con Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error) {
      throw error;
    }

    return {
      statusCode: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Necesario para CORS
      },
      body: JSON.stringify(user),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error al verificar la sesión' }),
    };
  }
};
