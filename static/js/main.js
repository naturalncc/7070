// ==================== MAIN APPLICATION CONTROLLER - EDITABLE SECTION START ====================
class HolisticApp {
    constructor() {
        this.currentUser = null;
        this.chatOpen = false;
        this.products = [];
        this.filteredProducts = [];
        this.categories = [];
        
        this.init();
    }
    
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
            if (e.target.matches('.logout-btn')) this.logout();
        });
        
        // Forms
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const contactForm = document.getElementById('contactForm');
        
        if (loginForm) loginForm.addEventListener('submit', this.handleLogin.bind(this));
        if (registerForm) registerForm.addEventListener('submit', this.handleRegister.bind(this));
        if (contactForm) contactForm.addEventListener('submit', this.handleContact.bind(this));
        
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
    
    // ==================== USER AUTHENTICATION - EDITABLE SECTION START ====================
    async loadUserSession() {
        try {
            const response = await fetch('/api/user-session');
            const data = await response.json();
            
            if (data.logged_in) {
                this.currentUser = data.user;
            }
        } catch (error) {
            console.error('Error loading user session:', error);
        }
    }
    
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
    
    async handleLogin(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.get('username'),
                    password: formData.get('password')
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                this.currentUser = data.user;
                this.closeAuthModal();
                this.updateUI();
                this.showMessage('Sesión iniciada exitosamente', 'success');
            } else {
                this.showMessage(data.message, 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showMessage('Error al iniciar sesión', 'error');
        }
    }
    
    async handleRegister(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        
        if (password !== confirmPassword) {
            this.showMessage('Las contraseñas no coinciden', 'error');
            return;
        }
        
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.get('username'),
                    email: formData.get('email'),
                    password: password
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                this.showMessage('Registro exitoso. Ahora puedes iniciar sesión.', 'success');
                this.showAuthModal('login');
            } else {
                this.showMessage(data.message, 'error');
            }
        } catch (error) {
            console.error('Register error:', error);
            this.showMessage('Error al registrar usuario', 'error');
        }
    }
    
    async logout() {
        try {
            const response = await fetch('/logout', { method: 'POST' });
            const data = await response.json();
            
            if (data.success) {
                this.currentUser = null;
                this.updateUI();
                this.showMessage('Sesión cerrada exitosamente', 'success');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
    // ==================== USER AUTHENTICATION - EDITABLE SECTION END ====================
    
    // ==================== CHAT ASSISTANT - EDITABLE SECTION START ====================
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
        
        // Show typing indicator
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
        
        // Add animation
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
    // ==================== CHAT ASSISTANT - EDITABLE SECTION END ====================
    
    // ==================== PRODUCTS AND SEARCH - EDITABLE SECTION START ====================
    async loadCategories() {
        try {
            // Load categories from Categorias.js
            if (typeof window.categoriesData !== 'undefined') {
                this.categories = window.categoriesData;
                this.products = [];
                
                // Flatten products from all categories
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
    // ==================== PRODUCTS AND SEARCH - EDITABLE SECTION END ====================
    
    // ==================== TESTS FUNCTIONALITY - EDITABLE SECTION START ====================
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
        
        // Simple scoring system - customize based on specific test needs
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
    // ==================== TESTS FUNCTIONALITY - EDITABLE SECTION END ====================
    
    // ==================== NAVIGATION AND UI - EDITABLE SECTION START ====================
    setupMegaMenu() {
        // Mega menu functionality is handled by CSS :hover
        // Additional JavaScript can be added here for more complex interactions
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
    
    async handleContact(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        
        try {
            const response = await fetch('/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    message: formData.get('message')
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                this.showMessage(data.message, 'success');
                form.reset();
            } else {
                this.showMessage(data.message, 'error');
            }
        } catch (error) {
            console.error('Contact error:', error);
            this.showMessage('Error al enviar mensaje', 'error');
        }
    }
    
    updateUI() {
        // Update navigation based on user login status
        const loginBtn = document.querySelector('.login-btn');
        const registerBtn = document.querySelector('.register-btn');
        const logoutBtn = document.querySelector('.logout-btn');
        const userInfo = document.querySelector('.user-info');
        
        if (this.currentUser) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (registerBtn) registerBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'inline-block';
            if (userInfo) {
                userInfo.textContent = `Bienvenido, ${this.currentUser.username}`;
                userInfo.style.display = 'inline-block';
            }
        } else {
            if (loginBtn) loginBtn.style.display = 'inline-block';
            if (registerBtn) registerBtn.style.display = 'inline-block';
            if (logoutBtn) logoutBtn.style.display = 'none';
            if (userInfo) userInfo.style.display = 'none';
        }
    }
    
    showMessage(message, type = 'info') {
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
    // ==================== NAVIGATION AND UI - EDITABLE SECTION END ====================
}

// ==================== INITIALIZE APPLICATION - EDITABLE SECTION START ====================
// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new HolisticApp();
});

// Global function for test results
window.calculateTestResult = function(testId) {
    if (window.app) {
        window.app.calculateTestResult(testId);
    }
};

// Global function for opening chat with message
window.openChat = function(message) {
    if (window.app) {
        window.app.openChat(message);
    }
};
// ==================== INITIALIZE APPLICATION - EDITABLE SECTION END ====================
