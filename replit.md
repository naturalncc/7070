# MCU - Medicina Holística E-commerce Platform

## Overview

MCU is a comprehensive e-commerce platform specializing in holistic medicine and natural products. The application serves as a complete web solution featuring a dynamic product catalog, AI-powered virtual assistant, user authentication, health assessment tests, and educational content. The platform is designed to provide a seamless shopping experience for customers seeking natural health products while offering personalized recommendations through an intelligent chatbot system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Multi-page application** built with HTML templates using Jinja2 templating engine
- **Responsive design** implemented with Bootstrap 5.3.0 and custom CSS variables
- **Component-based structure** with reusable navigation, modals, and product cards
- **Dynamic content loading** through JavaScript modules for categories and products
- **Mobile-first approach** with responsive breakpoints and mobile menu functionality

### Backend Architecture
- **Flask web framework** serving as the main application server
- **Modular route structure** separating concerns across different page sections
- **Model-View-Controller pattern** with clear separation between data models, business logic, and presentation
- **Session management** for user authentication and chat persistence
- **RESTful API endpoints** for authentication, chat interactions, and product management

### Data Management
- **SQLAlchemy ORM** for database abstraction and relationship management
- **PostgreSQL database** hosted on Supabase for user data and chat sessions
- **JavaScript data modules** for static product catalog (Categorias.js)
- **In-memory session storage** for temporary user interactions

### Authentication System
- **Custom user registration and login** with password hashing using Werkzeug
- **Session-based authentication** with Flask sessions
- **User model** storing username, email, password hash, and timestamps
- **Registration validation** with duplicate checking and error handling

### AI Integration
- **Google Gemini AI integration** for the MCU virtual sales assistant
- **Specialized prompt engineering** for holistic medicine recommendations
- **Context-aware conversations** linking health tests with product suggestions
- **Chat session persistence** storing conversation history in database

### Product Management
- **Category-based organization** with 15 categories containing 3 products each
- **Horizontal card layout** optimized for product display (900px max-width)
- **Image standardization** using 250x250px product images
- **Advanced search functionality** filtering by benefits, name, ID, and image reference

### Health Assessment System
- **Interactive health tests** for digestive health, energy, mental wellness, immune system, and metabolism
- **Scoring algorithms** providing personalized recommendations
- **Integration with AI assistant** for targeted product suggestions based on test results

## External Dependencies

### Core Framework Dependencies
- **Flask** - Python web framework for server-side logic
- **SQLAlchemy** - Object-relational mapping for database operations
- **Flask-SQLAlchemy** - Flask integration for SQLAlchemy
- **Werkzeug** - WSGI utilities for password hashing and security

### Database Services
- **Supabase** - PostgreSQL database hosting and authentication services
- **PostgreSQL** - Relational database for user accounts and chat sessions

### AI and ML Services
- **Google Gemini API** - Large language model for virtual assistant functionality
- **google-genai SDK** - Python client library for Gemini API integration

### Frontend Libraries
- **Bootstrap 5.3.0** - CSS framework for responsive design and components
- **Font Awesome 6.4.0** - Icon library for UI elements
- **Vanilla JavaScript** - Client-side interactivity without additional frameworks

### Development and Deployment
- **Environment variables** - Configuration management for API keys and database URLs
- **ProxyFix middleware** - HTTPS URL generation in production environments
- **Connection pooling** - Database connection management with recycle and ping settings