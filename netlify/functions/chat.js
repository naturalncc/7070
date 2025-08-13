// ==================== CONFIGURACIÓN DE LA FUNCIÓN CHAT - SECCIÓN EDITABLE INICIO ====================
const { GoogleGenAI } = require('@google/genai');

// Configuración de la función
const CONFIG = {
    MODEL_NAME: 'gemini-2.5-flash',
    MAX_TOKENS: 1000,
    TEMPERATURE: 0.7,
    TIMEOUT: 25000 // 25 segundos (menos que el timeout de Netlify)
};

// Sistema de prompt para MCU
const SYSTEM_PROMPT = `
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

// Cliente de Gemini
let genAI = null;

// Inicializar cliente
function initializeClient() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('GEMINI_API_KEY no está configurada');
    }
    
    genAI = new GoogleGenAI({ apiKey });
    return genAI;
}
// ==================== CONFIGURACIÓN DE LA FUNCIÓN CHAT - SECCIÓN EDITABLE FIN ====================

// ==================== FUNCIÓN PRINCIPAL - SECCIÓN EDITABLE INICIO ====================
exports.handler = async (event, context) => {
    // Configurar timeout del contexto
    context.callbackWaitsForEmptyEventLoop = false;
    
    // Configurar headers CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json'
    };
    
    try {
        // Manejar preflight OPTIONS
        if (event.httpMethod === 'OPTIONS') {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ message: 'CORS preflight' })
            };
        }
        
        // Solo permitir POST
        if (event.httpMethod !== 'POST') {
            return {
                statusCode: 405,
                headers,
                body: JSON.stringify({
                    success: false,
                    error: 'Método no permitido. Solo se acepta POST.'
                })
            };
        }
        
        // Validar y parsear el cuerpo de la petición
        let requestData;
        try {
            requestData = JSON.parse(event.body || '{}');
        } catch (error) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    success: false,
                    error: 'JSON inválido en el cuerpo de la petición'
                })
            };
        }
        
        // Validar campos requeridos
        const { message, sessionId, userContext } = requestData;
        
        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    success: false,
                    error: 'El campo "message" es requerido y no puede estar vacío'
                })
            };
        }
        
        if (message.length > 500) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    success: false,
                    error: 'El mensaje no puede exceder 500 caracteres'
                })
            };
        }
        
        // Inicializar cliente de Gemini
        if (!genAI) {
            initializeClient();
        }
        
        // Generar respuesta con timeout
        const response = await Promise.race([
            generateChatResponse(message, userContext || ''),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Timeout')), CONFIG.TIMEOUT)
            )
        ]);
        
        // Log para debugging (remover en producción si es necesario)
        console.log(`Chat request processed - Session: ${sessionId}, Context: ${userContext}`);
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                response: response,
                sessionId: sessionId,
                timestamp: new Date().toISOString()
            })
        };
        
    } catch (error) {
        console.error('Error en función chat:', error);
        
        // Manejar diferentes tipos de errores
        let errorMessage = 'Error interno del servidor';
        let statusCode = 500;
        
        if (error.message === 'Timeout') {
            errorMessage = 'Tiempo de respuesta agotado. Por favor, intenta de nuevo.';
            statusCode = 504;
        } else if (error.message.includes('GEMINI_API_KEY')) {
            errorMessage = 'Configuración de API incorrecta';
            statusCode = 500;
        } else if (error.message.includes('quota') || error.message.includes('limit')) {
            errorMessage = 'Servicio temporalmente no disponible. Intenta más tarde.';
            statusCode = 503;
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
            errorMessage = 'Error de conexión. Por favor, intenta de nuevo.';
            statusCode = 502;
        }
        
        return {
            statusCode,
            headers,
            body: JSON.stringify({
                success: false,
                error: errorMessage,
                timestamp: new Date().toISOString()
            })
        };
    }
};
// ==================== FUNCIÓN PRINCIPAL - SECCIÓN EDITABLE FIN ====================

// ==================== GENERACIÓN DE RESPUESTA - SECCIÓN EDITABLE INICIO ====================
async function generateChatResponse(userMessage, userContext) {
    try {
        // Obtener modelo
        const model = genAI.getGenerativeModel({ 
            model: CONFIG.MODEL_NAME,
            generationConfig: {
                temperature: CONFIG.TEMPERATURE,
                maxOutputTokens: CONFIG.MAX_TOKENS,
            }
        });
        
        // Construir prompt completo
        const fullPrompt = `${SYSTEM_PROMPT}

Contexto del usuario: ${userContext}

Mensaje del usuario: ${userMessage}

Responde como MCU de manera natural, profesional y orientada a ayudar al usuario con sus necesidades de medicina holística:`;
        
        // Generar respuesta
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();
        
        if (!text || text.trim().length === 0) {
            throw new Error('Respuesta vacía del modelo');
        }
        
        // Filtrar y limpiar la respuesta
        const cleanResponse = cleanAndValidateResponse(text);
        
        return cleanResponse;
        
    } catch (error) {
        console.error('Error generando respuesta:', error);
        
        // Respuestas de fallback más específicas
        if (error.message.includes('quota') || error.message.includes('limit')) {
            return 'Disculpa, estoy experimentando alta demanda en este momento. Te invito a explorar nuestros productos y test de salud mientras tanto, o intenta contactarme de nuevo en unos minutos.';
        }
        
        if (error.message.includes('safety') || error.message.includes('blocked')) {
            return 'Lo siento, no puedo procesar ese mensaje. ¿Podrías reformular tu consulta sobre productos naturales o medicina holística?';
        }
        
        return 'Disculpa, estoy teniendo dificultades técnicas temporales. Mientras tanto, te invito a explorar nuestros productos y realizar nuestros test de salud gratuitos. ¿Podrías intentar tu consulta de nuevo?';
    }
}

function cleanAndValidateResponse(text) {
    // Limpiar la respuesta
    let cleaned = text.trim();
    
    // Remover caracteres de control
    cleaned = cleaned.replace(/[\x00-\x1F\x7F]/g, '');
    
    // Limitar longitud
    if (cleaned.length > 1000) {
        cleaned = cleaned.substring(0, 997) + '...';
    }
    
    // Validar que la respuesta sea apropiada
    if (cleaned.length < 10) {
        return 'Gracias por tu mensaje. Te invito a explorar nuestros productos naturales y realizar nuestros test de salud. ¿En qué específicamente puedo ayudarte hoy?';
    }
    
    // Asegurar que mencione MCU o medicina holística
    const contextKeywords = ['mcu', 'medicina holística', 'natural', 'producto', 'test', 'salud'];
    const hasContext = contextKeywords.some(keyword => 
        cleaned.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (!hasContext) {
        cleaned += '\n\n¿Te gustaría conocer más sobre nuestros productos naturales o realizar alguno de nuestros test de salud?';
    }
    
    return cleaned;
}
// ==================== GENERACIÓN DE RESPUESTA - SECCIÓN EDITABLE FIN ====================

// ==================== UTILIDADES - SECCIÓN EDITABLE INICIO ====================
function validateInput(message) {
    // Validaciones adicionales de seguridad
    const blockedPatterns = [
        /script/i,
        /<[^>]*>/,  // HTML tags
        /javascript:/i,
        /data:/i,
        /vbscript:/i
    ];
    
    for (const pattern of blockedPatterns) {
        if (pattern.test(message)) {
            throw new Error('Contenido no válido detectado');
        }
    }
    
    return true;
}

function sanitizeMessage(message) {
    // Sanitizar mensaje del usuario
    return message
        .trim()
        .replace(/[<>]/g, '') // Remover < y >
        .substring(0, 500); // Limitar longitud
}

function logRequest(sessionId, userContext, messageLength, responseLength) {
    // Log básico para monitoreo (sin datos sensibles)
    console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        sessionId: sessionId ? 'present' : 'missing',
        userContext: userContext ? 'present' : 'missing',
        messageLength,
        responseLength,
        function: 'chat'
    }));
}
// ==================== UTILIDADES - SECCIÓN EDITABLE FIN ====================

