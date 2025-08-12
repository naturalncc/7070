// ==================== SUPABASE CONFIGURACIÓN INICIO ====================
const supabaseUrl = 'https://xqdrghfepohivjpyhnlh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxZHJnaGZlcG9oaXZqcHlobmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NzAwODIsImV4cCI6MjA3MDE0NjA4Mn0.azzMA3b-KRiIEGQ-OqxrYkmHzdLSHg6uRrgFmaTUS0o';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
// ==================== SUPABASE CONFIGURACIÓN FIN ======================


// ==================== CLASE PRINCIPAL DE LA APP INICIO ====================
class HolisticApp {
    constructor() {
        // ==================== VARIABLES DE ESTADO INICIO ====================
        this.currentUser = null;
        this.chatOpen = false;
        this.products = [];
        this.filteredProducts = [];
        this.categories = [];
        // ==================== VARIABLES DE ESTADO FIN =======================
        this.init();
    }

    // ==================== INICIALIZACIÓN PRINCIPAL ====================
    async init() {
        this.setupEventListeners();
        await this.loadUserSession();
        await this.loadCategories();
        this.setupChat();
        this.setupMegaMenu();
        this.setupSearch();
        this.updateUI();
        console.log('MCU Holistic App initialized successfully');
    }

    // ==================== EVENTOS DE UI Y FORMULARIOS ====================
    setupEventListeners() {
        // Navigation and mobile menu
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
        }
        // Auth buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('.login-btn')) this.showAuthModal('login');
            if (e.target.matches('.register-btn')) this.showAuthModal('register');
            if (e.target.matches('.logout-btn')) this.handleLogout();
        });

        // Forms
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const contactForm = document.getElementById('contactForm');
        if (loginForm) loginForm.addEventListener('submit', this.handleLogin.bind(this));
        if (registerForm) registerForm.addEventListener('submit', this.handleRegister.bind(this));
        if (contactForm) contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nombre = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const mensaje = document.getElementById('contactMessage').value.trim();
            try {
                await this.guardarContactoSupabase(nombre, email, mensaje);
                this.showMessage('¡Mensaje enviado correctamente!', 'success');
                contactForm.reset();
            } catch (err) {
                this.showMessage('Hubo un error al enviar el mensaje: ' + err.message, 'error');
            }
        });

        // Test accordions
        document.addEventListener('click', (e) => {
            if (e.target.matches('.test-header') || e.target.closest('.test-header')) {
                this.toggleTest(e.target.closest('.test-item'));
            }
        });
        // Category cards navigation
        document.addEventListener('click', (e) => {
            if (e.target.matches('.category-card') || e.target.closest('.category-card')) {
                window.location.href = '/productos';
            }
        });
        // Modal close
        document.addEventListener('click', (e) => {
            if (e.target.matches('.close-modal') || e.target.matches('.auth-modal')) {
                this.closeAuthModal();
            }
        });
    }

    // ==================== AUTENTICACIÓN USUARIO SUPABASE ====================
    async loadUserSession() {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            this.currentUser = user || null;
        } catch (error) {
            console.error('Error cargando sesión de usuario (Supabase):', error);
            this.currentUser = null;
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        const form = e.target;
        const username = form.querySelector('[name="username"]').value.trim();
        const password = form.querySelector('[name="password"]').value;

        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email: username, password });
            if (error) {
                this.showMessage('Error al iniciar sesión: ' + error.message, 'error');
                return;
            }
            this.currentUser = data.user;
            this.closeAuthModal();
            await this.updateUI();
            this.showMessage('Sesión iniciada exitosamente', 'success');
        } catch (error) {
            this.showMessage('Error al iniciar sesión: ' + error.message, 'error');
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        const form = e.target;
        const username = form.querySelector('[name="username"]').value.trim();
        const email = form.querySelector('[name="email"]').value.trim();
        const phone = form.querySelector('[name="phone"]').value.trim();
        const password = form.querySelector('[name="password"]').value;
        const confirmPassword = form.querySelector('[name="confirmPassword"]').value;

        if (password !== confirmPassword) {
            this.showMessage('Las contraseñas no coinciden', 'error');
            return;
        }

        try {
            // Insertar en tabla personalizada phone_contacts
            const { data, error } = await supabase
                .from('phone_contacts')
                .insert([
                    {
                        nombre: username,
                        correo_electronico: email,
                        telefono: phone,
                        fuente: 'web'
                    }
                ]);
            if (error) {
                this.showMessage('Error al registrar: ' + error.message, 'error');
                return;
            }
            this.closeAuthModal();
            this.showMessage('¡Registrado exitosamente!', 'success');
            form.reset();
        } catch (error) {
            this.showMessage('Error al registrar: ' + error.message, 'error');
        }
    }

    async handleLogout() {
        try {
            await supabase.auth.signOut();
            this.currentUser = null;
            await this.updateUI();
            this.showMessage('Sesión cerrada', 'success');
        } catch (error) {
            this.showMessage('Error al cerrar sesión: ' + error.message, 'error');
        }
    }

    // ==================== GUARDAR CONTACTO EN SUPABASE ====================
    async guardarContactoSupabase(nombre, email, mensaje) {
        const { data, error } = await supabase
            .from('contactos')
            .insert([{ nombre, email, mensaje }]);
        if (error) throw error;
        return data;
    }

    // ==================== UI HELPERS ====================
    showMessage(message, type = 'info') {
        // Puedes mejorar esto con un div en vez de alert si quieres
        const messageDiv = document.createElement('div');
        messageDiv.className = `alert alert-${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            background-color: ${type === 'success' ? 'var(--color-apple-green)' : 
                              type === 'error' ? '#dc3545' : 'var(--color-turquoise)'};
            color: white;
            z-index: 3000;
            box-shadow: var(--shadow-medium);
        `;
        document.body.appendChild(messageDiv);
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    updateUI() {
        // Actualiza tu UI según si hay usuario logueado o no
        const loginBtn = document.querySelector('.login-btn');
        const registerBtn = document.querySelector('.register-btn');
        const logoutBtn = document.querySelector('.logout-btn');
        const userInfo = document.querySelector('.user-info');
        if (this.currentUser) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (registerBtn) registerBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'inline-block';
            if (userInfo) {
                userInfo.textContent = `Bienvenido, ${this.currentUser.username || this.currentUser.email}`;
                userInfo.style.display = 'inline-block';
            }
        } else {
            if (loginBtn) loginBtn.style.display = 'inline-block';
            if (registerBtn) registerBtn.style.display = 'inline-block';
            if (logoutBtn) logoutBtn.style.display = 'none';
            if (userInfo) userInfo.style.display = 'none';
        }
    }

    // ==================== MODALS AUTENTICACIÓN ====================
    showAuthModal(type) {
        const modal = document.getElementById('authModal');
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const modalTitle = document.getElementById('authModalTitle');
        if (!modal || !loginForm || !registerForm || !modalTitle) return;

        if (type === 'login') {
            modalTitle.textContent = 'Iniciar Sesión';
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        } else {
            modalTitle.textContent = 'Registrarse';
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        }
        modal.classList.add('show');
    }
    closeAuthModal() {
        const modal = document.getElementById('authModal');
        if (modal) {
            modal.classList.remove('show');
        }
    }

    // ==================== CHAT ASSISTANT - TODAS TUS FUNCIONES DE CHAT ====================
    setupChat() {
        const chatToggle = document.getElementById('chatToggle');
        const chatContainer = document.getElementById('chatContainer');
        const chatInput = document.getElementById('chatInput');
        const sendButton = document.getElementById('sendMessage');
        if (chatToggle && chatContainer) {
            chatToggle.addEventListener('click', this.toggleChat.bind(this));
        }
        if (sendButton) {
            sendButton.addEventListener('click', this.sendChatMessage.bind(this));
        }
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendChatMessage();
                }
            });
        }
        // Add initial welcome message
        setTimeout(() => {
            this.addChatMessage('assistant', '¡Hola! Soy MCU, tu asesor de salud holística. ¿Cómo puedo ayudarte hoy? Te invito a explorar nuestros productos y realizar nuestros test de salud para recomendaciones personalizadas.');
        }, 1000);
    }
    toggleChat() {
        const chatContainer = document.getElementById('chatContainer');
        const chatToggle = document.getElementById('chatToggle');
        if (chatContainer) {
            this.chatOpen = !this.chatOpen;
            chatContainer.style.display = this.chatOpen ? 'flex' : 'none';
            if (chatToggle) {
                chatToggle.innerHTML = this.chatOpen ? '×' : '💬';
            }
        }
    }
    async sendChatMessage() {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput.value.trim();
        if (!message) return;
        this.addChatMessage('user', message);
        chatInput.value = '';
        this.showTypingIndicator();
        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });
            const data = await response.json();
            this.hideTypingIndicator();
            if (data.success) {
                this.addChatMessage('assistant', data.response);
            } else {
                this.addChatMessage('assistant', 'Lo siento, no pude procesar tu mensaje. ¿Podrías intentarlo de nuevo?');
            }
        } catch (error) {
            console.error('Chat error:', error);
            this.hideTypingIndicator();
            this.addChatMessage('assistant', 'Estoy teniendo problemas técnicos. Por favor, inténtalo más tarde.');
        }
    }
    addChatMessage(sender, message) {
        const messagesContainer = document.getElementById('chatMessages');
        if (!messagesContainer) return;
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = message;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        messageDiv.classList.add('slide-up');
    }
    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatMessages');
        if (!messagesContainer) return;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message assistant typing-indicator';
        typingDiv.innerHTML = 'MCU está escribiendo...';
        typingDiv.id = 'typingIndicator';
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // ==================== PRODUCTS AND SEARCH ====================
    async loadCategories() {
        try {
            if (typeof window.categoriesData !== 'undefined') {
                this.categories = window.categoriesData;
                this.products = [];
                this.categories.forEach(category => {
                    category.products.forEach(product => {
                        this.products.push({
                            ...product,
                            category: category.name,
                            categoryId: category.id
                        });
                    });
                });
                this.filteredProducts = [...this.products];
                this.renderProducts();
            }
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    }
    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        const filterSelect = document.getElementById('filterSelect');
        if (searchInput) {
            searchInput.addEventListener('input', this.performSearch.bind(this));
        }
        if (filterSelect) {
            filterSelect.addEventListener('change', this.performSearch.bind(this));
        }
    }
    performSearch() {
        const searchInput = document.getElementById('searchInput');
        const filterSelect = document.getElementById('filterSelect');
        if (!searchInput) return;
        const searchTerm = searchInput.value.toLowerCase().trim();
        const filterType = filterSelect ? filterSelect.value : 'all';
        this.filteredProducts = this.products.filter(product => {
            let matches = false;
            if (filterType === 'all' || filterType === 'name') {
                matches = matches || product.name.toLowerCase().includes(searchTerm);
            }
            if (filterType === 'all' || filterType === 'description') {
                matches = matches || product.description.toLowerCase().includes(searchTerm);
            }
            if (filterType === 'all' || filterType === 'benefits') {
                matches = matches || product.benefits.some(benefit => 
                    benefit.toLowerCase().includes(searchTerm)
                );
            }
            if (filterType === 'all' || filterType === 'category') {
                matches = matches || product.category.toLowerCase().includes(searchTerm);
            }
            return matches;
        });
        this.renderProducts();
    }
    renderProducts() {
        const productsContainer = document.getElementById('productsContainer');
        if (!productsContainer) return;
        if (this.filteredProducts.length === 0) {
            productsContainer.innerHTML = `
                <div class="text-center p-lg">
                    <h3>No se encontraron productos</h3>
                    <p>Intenta con otros términos de búsqueda o explora nuestras categorías.</p>
                </div>
            `;
            return;
        }
        const productsHTML = this.filteredProducts.map(product => `
            <div class="product-card fade-in">
                <img src="${product.image}" alt="${product.name}" class="product-image" 
                     onerror="this.src='https://via.placeholder.com/250x250/8fbc8f/ffffff?text=Producto'">
                <div class="product-content">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-benefits">
                        <h4>Beneficios:</h4>
                        <ul class="benefits-list">
                            ${product.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="product-price">${product.price}</div>
                </div>
            </div>
        `).join('');
        productsContainer.innerHTML = productsHTML;
    }

    // ==================== TESTS FUNCTIONALITY ====================
    toggleTest(testItem) {
        const testContent = testItem.querySelector('.test-content');
        const testToggle = testItem.querySelector('.test-toggle');
        if (!testContent || !testToggle) return;
        const isActive = testContent.classList.contains('active');
        // Close all other tests
        document.querySelectorAll('.test-content.active').forEach(content => {
            content.classList.remove('active');
        });
        document.querySelectorAll('.test-toggle').forEach(toggle => {
            toggle.style.transform = 'rotate(0deg)';
        });
        // Toggle current test
        if (!isActive) {
            testContent.classList.add('active');
            testToggle.style.transform = 'rotate(180deg)';
        }
    }
    calculateTestResult(testId) {
        const testForm = document.getElementById(testId);
        if (!testForm) return;
        const formData = new FormData(testForm);
        const answers = {};
        for (let [key, value] of formData.entries()) {
            answers[key] = value;
        }
        let score = 0;
        Object.values(answers).forEach(answer => {
            if (answer === 'si' || answer === 'frecuente') score += 2;
            if (answer === 'aveces' || answer === 'ocasional') score += 1;
        });
        const resultDiv = testForm.nextElementSibling;
        if (resultDiv && resultDiv.classList.contains('test-result')) {
            let resultText = '';
            let recommendations = '';
            if (score >= 8) {
                resultText = 'Nivel Alto: Se recomienda consultar con un especialista.';
                recommendations = 'Te sugerimos realizar una consulta personalizada y explorar nuestros productos especializados.';
            } else if (score >= 4) {
                resultText = 'Nivel Moderado: Considera mejorar algunos hábitos.';
                recommendations = 'Revisa nuestras categorías de productos naturales que pueden ayudarte.';
            } else {
                resultText = 'Nivel Bajo: Mantén tus buenos hábitos.';
                recommendations = 'Continúa con tu estilo de vida saludable y considera nuestros productos preventivos.';
            }
            resultDiv.innerHTML = `
                <h4>Resultado:</h4>
                <p><strong>${resultText}</strong></p>
                <p>${recommendations}</p>
                <button class="btn btn-primary" onclick="app.openChat('Hice el test ${testId} y obtuve: ${resultText}. ¿Qué productos me recomiendas?')">
                    Consultar con MCU
                </button>
            `;
            resultDiv.classList.add('show');
        }
    }
    openChat(message = '') {
        this.toggleChat();
        if (message) {
            const chatInput = document.getElementById('chatInput');
            if (chatInput) {
                chatInput.value = message;
                setTimeout(() => this.sendChatMessage(), 500);
            }
        }
    }

    // ==================== NAVEGACIÓN Y MENÚS ====================
    setupMegaMenu() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const megaMenu = item.querySelector('.mega-menu');
            if (megaMenu) {
                item.addEventListener('mouseenter', () => {
                    megaMenu.style.display = 'block';
                });
                item.addEventListener('mouseleave', () => {
                    setTimeout(() => {
                        megaMenu.style.display = 'none';
                    }, 200);
                });
            }
        });
    }
    toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.classList.toggle('active');
        }
    }
}
// ==================== CLASE PRINCIPAL DE LA APP FIN ====================


// ==================== INICIALIZACIÓN AUTOMÁTICA ====================
document.addEventListener('DOMContentLoaded', () => {
    window.app = new HolisticApp();
});
// Global para tests desde HTML
window.calculateTestResult = function(testId) {
    if (window.app) {
        window.app.calculateTestResult(testId);
    }
};
// Global para abrir chat desde HTML
window.openChat = function(message) {
    if (window.app) {
        window.app.openChat(message);
    }
};
// ==================== INICIALIZACIÓN AUTOMÁTICA FIN ====================
