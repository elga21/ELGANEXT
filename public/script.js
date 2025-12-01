// Detect environment and use correct API URL
const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : `${window.location.origin}/api`;

let isLogin = true;

// Update menu based on login status
function updateMenu() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const authMenuItem = document.getElementById('auth-menu-item');
    const chatMenuItem = document.getElementById('chat-menu-item');

    if (token && username && authMenuItem) {
        authMenuItem.innerHTML = `<a href="#" onclick="logout(); return false;">👤 ${username}</a>`;
        if (chatMenuItem) chatMenuItem.style.display = 'block';
    }
}

// Call updateMenu on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateMenu);
} else {
    updateMenu();
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// Auth functions
function toggleAuth() {
    isLogin = !isLogin;
    const formTitle = document.getElementById('form-title');
    const authBtn = document.getElementById('auth-btn');
    const switchLink = document.querySelector('.switch-link');

    if (formTitle && authBtn && switchLink) {
        formTitle.innerText = isLogin ? 'LOGIN' : 'REGISTRO';
        authBtn.innerText = isLogin ? 'ACCEDER AL SISTEMA' : 'CREAR CUENTA';
        switchLink.innerText = isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión';
        authBtn.onclick = isLogin ? login : register;
    }
}

async function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        if (res.ok) {
            alert('Registro exitoso. Por favor inicia sesión.');
            toggleAuth();
        } else {
            alert(data.error || 'Error en el registro');
        }
    } catch (e) {
        alert('Error conectando con el servidor');
    }
}

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', username);
            window.location.href = 'chat.html';
        } else {
            alert(data.error || 'Error en el login');
        }
    } catch (e) {
        alert('Error conectando con el servidor');
    }
}

// Chat functions
async function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value;
    if (!message) return;

    addMessage(message, 'user-message');
    input.value = '';

    // Add loading indicator
    const loadingDiv = addMessage('Pensando...', 'bot-message');

    try {
        const res = await fetch(`${API_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ message })
        });

        const data = await res.json();

        // Remove loading text
        loadingDiv.remove();

        if (data.reply) {
            addMessage(data.reply, 'bot-message');
        } else {
            addMessage(data.error || 'Error conectando con ELGANEXT.', 'bot-message');
        }
    } catch (error) {
        loadingDiv.remove();
        addMessage('Error de red: ' + error.message, 'bot-message');
    }
}

function addMessage(text, className) {
    const chatBox = document.getElementById('chat-box');
    const div = document.createElement('div');
    div.className = `message ${className}`;
    div.innerText = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
    return div;
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = 'home.html';
}

// Contact form
async function submitContact(event) {
    event.preventDefault();

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;

    try {
        const res = await fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, subject, message })
        });

        const data = await res.json();
        if (res.ok) {
            document.getElementById('contactForm').reset();
            document.getElementById('contact-success').style.display = 'block';
            setTimeout(() => {
                document.getElementById('contact-success').style.display = 'none';
            }, 5000);
        } else {
            alert(data.error || 'Error enviando el mensaje');
        }
    } catch (e) {
        alert('Error conectando con el servidor');
    }
}
