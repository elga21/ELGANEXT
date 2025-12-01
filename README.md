# ELGANEXT - Web Futurista con IA

## Descripción
ELGANEXT es una aplicación web futurista con asistente de inteligencia artificial, desarrollada por Bevans. Incluye autenticación de usuarios, chat con IA, formulario de contacto y diseño responsive con fondo interactivo de red de nodos.

## Características
- 🤖 Asistente IA con Google Gemini
- 🔐 Sistema de autenticación (registro/login)
- 📧 Formulario de contacto con almacenamiento en XLSX
- 🎨 Diseño futurista con colores negro y cyan (#328ba8)
- 📱 100% Responsive (móvil, tablet, desktop)
- ✨ Fondo animado con red de nodos interactiva

## Instalación

1. Descomprime el archivo ZIP
2. Abre una terminal en la carpeta del proyecto
3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Configura las variables de entorno en el archivo `.env`:

   **API de Google Gemini:**
   ```
   GEMINI_API_KEY=tu_clave_api_aqui
   ```

   **WhatsApp con Twilio (Opcional):**
   Sigue la guía en `TWILIO_SETUP.md` para configurar notificaciones de WhatsApp.
   ```
   TWILIO_ACCOUNT_SID=tu_account_sid
   TWILIO_AUTH_TOKEN=tu_auth_token  
   TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
   ```

5. Inicia el servidor:
   ```bash
   npm start
   ```

6. Abre tu navegador en `http://localhost:3000`

## Estructura del Proyecto
```
futuristic-chat-app/
├── public/
│   ├── home.html          # Página de inicio
│   ├── auth.html          # Login/Registro
│   ├── chat.html          # Asistente IA
│   ├── products.html      # Productos/servicios
│   ├── contact.html       # Formulario de contacto
│   ├── style.css          # Estilos (responsive)
│   ├── script.js          # Lógica de la aplicación
│   └── network.js         # Animación de red de nodos
├── server.js              # Servidor Express
├── db.js                 # Manejo de base de datos XLSX
├── .env                  # Variables de entorno
├── package.json          # Dependencias
└── README.md             # Este archivo
```

## Uso

### Navegación
- **Inicio**: Página principal con información del proyecto
- **Login/Registro**: Crea una cuenta o inicia sesión
- **Asistente IA**: Chat con el asistente ELGANEXT (requiere login)
- **Productos**: Muestra de productos y servicios
- **Contacto**: Formulario para enviar mensajes

### Base de Datos
Los datos se almacenan en archivos Excel (.xlsx):
- `users.xlsx`: Usuarios registrados
- `contacts.xlsx`: Mensajes del formulario de contacto

## Tecnologías
- **Backend**: Node.js, Express
- **Base de datos**: XLSX (Excel)
- **IA**: Google Gemini API
- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **Autenticación**: JWT

## Créditos
Desarrollado por Bevans
© 2025 ELGANEXT

## Soporte
Para preguntas o soporte, contacta a través del formulario de contacto en la web.
