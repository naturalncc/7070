import json
import logging
import os

import google.genai as genai

from pydantic import BaseModel


# IMPORTANT: KEEP THIS COMMENT
# Follow these instructions when using this blueprint:
# - Note that the newest Gemini model series is "gemini-2.5-flash" or gemini-2.5-pro"
#   - do not change this unless explicitly requested by the user
# - Sometimes the google genai SDK has occasional type errors. You might need to run to validate, at time.  
# The SDK was recently renamed from google-generativeai to google-genai. This file reflects the new name and the new APIs.

# This API key is from Gemini Developer API Key, not vertex AI API Key
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY", "default_key"))


def get_sales_assistant_response(message: str, user_context: str = "") -> str:
    """
    MCU Sales Assistant - Specialized in holistic medicine and natural products
    """
    system_prompt = """
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
    """
    
    try:
        full_prompt = f"{system_prompt}\n\nContexto del usuario: {user_context}\n\nMensaje del usuario: {message}"
        
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=full_prompt
        )
        
        return response.text or "Lo siento, no pude procesar tu mensaje. ¿Podrías repetirlo?"
        
    except Exception as e:
        logging.error(f"Error en chat assistant: {e}")
        return "Disculpa, estoy teniendo dificultades técnicas. Por favor, inténtalo de nuevo en unos momentos."


def analyze_health_symptoms(symptoms: str) -> str:
    """
    Analyze health symptoms and suggest appropriate tests and products
    """
    try:
        prompt = f"""
        Como especialista en medicina holística, analiza los siguientes síntomas y sugiere:
        1. Tests de salud apropiados que tenemos disponibles
        2. Categorías de productos que podrían ayudar
        3. Recomendaciones generales
        
        Síntomas: {symptoms}
        
        IMPORTANTE: Siempre indica que es información orientativa y que se consulte con un profesional de salud.
        """
        
        response = client.models.generate_content(
            model="gemini-2.5-pro",
            contents=prompt
        )
        
        return response.text or "No pude analizar los síntomas proporcionados."
        
    except Exception as e:
        logging.error(f"Error analyzing symptoms: {e}")
        return "Error al analizar síntomas. Consulta con un profesional de salud."
