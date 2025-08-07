from flask import render_template, request, jsonify, session, redirect, url_for, flash
from werkzeug.security import generate_password_hash, check_password_hash
from app import app, db
from models import User, ChatSession
from gemini import get_sales_assistant_response, analyze_health_symptoms
import uuid
import logging

logging.basicConfig(level=logging.DEBUG)

# ==================== MAIN PAGES ROUTES ====================
# Homepage with video and featured categories
@app.route('/')
def index():
    return render_template('index.html')

# About us page with company history and references
@app.route('/quienes-somos')
def quienes_somos():
    return render_template('quienes-somos.html')

# Studies and experiences page with multimedia content
@app.route('/estudios')
def estudios():
    return render_template('estudios.html')

# Quick health tests page
@app.route('/test-rapidos')
def test_rapidos():
    return render_template('test-rapidos.html')

# Products page with dynamic category loading
@app.route('/productos')
def productos():
    return render_template('productos.html')

# ==================== USER AUTHENTICATION ROUTES ====================
# User registration endpoint
@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        if not username or not email or not password:
            return jsonify({'success': False, 'message': 'Todos los campos son obligatorios'}), 400
        
        # Check if user already exists
        existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
        if existing_user:
            return jsonify({'success': False, 'message': 'Usuario o email ya existe'}), 400
        
        # Create new user
        password_hash = generate_password_hash(password)
        new_user = User()
        new_user.username = username
        new_user.email = email
        new_user.password_hash = password_hash
        
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({'success': True, 'message': 'Usuario registrado exitosamente'})
        
    except Exception as e:
        logging.error(f"Registration error: {e}")
        return jsonify({'success': False, 'message': 'Error interno del servidor'}), 500

# User login endpoint
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return jsonify({'success': False, 'message': 'Usuario y contraseña requeridos'}), 400
        
        user = User.query.filter_by(username=username).first()
        
        if user and check_password_hash(user.password_hash, password):
            session['user_id'] = user.id
            session['username'] = user.username
            return jsonify({'success': True, 'message': 'Login exitoso', 'user': {'id': user.id, 'username': user.username}})
        else:
            return jsonify({'success': False, 'message': 'Credenciales inválidas'}), 401
            
    except Exception as e:
        logging.error(f"Login error: {e}")
        return jsonify({'success': False, 'message': 'Error interno del servidor'}), 500

# User logout endpoint
@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'success': True, 'message': 'Logout exitoso'})

# ==================== AI CHAT ASSISTANT ROUTES ====================
# MCU AI sales assistant chat endpoint
@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        message = data.get('message', '').strip()
        
        if not message:
            return jsonify({'success': False, 'message': 'Mensaje vacío'}), 400
        
        # Get or create session ID
        if 'chat_session_id' not in session:
            session['chat_session_id'] = str(uuid.uuid4())
        
        # Build user context
        user_context = ""
        if 'user_id' in session:
            user = User.query.get(session['user_id'])
            if user:
                user_context = f"Usuario registrado: {user.username}"
            else:
                user_context = "Usuario visitante"
        else:
            user_context = "Usuario visitante"
        
        # Get AI response
        ai_response = get_sales_assistant_response(message, user_context)
        
        # Save chat session to database
        chat_session = ChatSession()
        chat_session.user_id = session.get('user_id')
        chat_session.session_id = session['chat_session_id']
        chat_session.message = message
        chat_session.response = ai_response
        db.session.add(chat_session)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'response': ai_response,
            'session_id': session['chat_session_id']
        })
        
    except Exception as e:
        logging.error(f"Chat error: {e}")
        return jsonify({'success': False, 'message': 'Error en el asistente virtual'}), 500

# Health symptoms analysis endpoint
@app.route('/analyze-symptoms', methods=['POST'])
def analyze_symptoms():
    try:
        data = request.get_json()
        symptoms = data.get('symptoms', '').strip()
        
        if not symptoms:
            return jsonify({'success': False, 'message': 'Síntomas requeridos'}), 400
        
        analysis = analyze_health_symptoms(symptoms)
        
        return jsonify({
            'success': True,
            'analysis': analysis
        })
        
    except Exception as e:
        logging.error(f"Symptoms analysis error: {e}")
        return jsonify({'success': False, 'message': 'Error al analizar síntomas'}), 500

# ==================== API ENDPOINTS FOR FRONTEND ====================
# Get current user session info
@app.route('/api/user-session', methods=['GET'])
def get_user_session():
    if 'user_id' in session:
        user = User.query.get(session['user_id'])
        if user:
            return jsonify({
                'logged_in': True,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                }
            })
        else:
            # Clear invalid session
            session.clear()
    return jsonify({'logged_in': False})

# Contact form submission
@app.route('/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')
        
        if not name or not email or not message:
            return jsonify({'success': False, 'message': 'Todos los campos son obligatorios'}), 400
        
        # Here you would typically send an email or save to database
        # For now, we'll just log the contact attempt
        logging.info(f"Contact form submission: {name} ({email}): {message}")
        
        return jsonify({'success': True, 'message': 'Mensaje enviado exitosamente. Te contactaremos pronto.'})
        
    except Exception as e:
        logging.error(f"Contact form error: {e}")
        return jsonify({'success': False, 'message': 'Error al enviar mensaje'}), 500
