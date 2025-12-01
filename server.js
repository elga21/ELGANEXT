const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { registerUser, loginUser, saveContact } = require('./db');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Try to load WhatsApp, but make it optional
let sendWhatsAppNotification = null;
try {
    const whatsapp = require('./whatsapp');
    sendWhatsAppNotification = whatsapp.sendWhatsAppNotification;
    whatsapp.initializeWhatsApp();
    console.log('✅ WhatsApp module loaded');
} catch (error) {
    console.log('⚠️ WhatsApp disabled (module not installed)');
    sendWhatsAppNotification = async () => ({ success: false, message: 'WhatsApp not available' });
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve home.html as default
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// AI Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Routes
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await registerUser(username, password);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await loginUser(username, password);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        console.log("Received chat message:", message);

        if (!process.env.GEMINI_API_KEY) {
            throw new Error("API Key is missing in server environment.");
        }

        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        // ELGANEXT AI Context
        const systemContext = `Soy ELGANEXT AI, una inteligencia artificial desarrollada por Bevans.

Represento a ELGANEXT, una organización tecnológica altamente capacitada para todo tipo de proyectos, desde el más sencillo hasta el más complejo.

SERVICIOS:
1. SERVICIOS DE SOFTWARE - Desarrollo industrial, empresarial y académico. Soluciones personalizadas, automatización digital.
2. DESARROLLO WEB - Sitios básicos a complejos, E-commerce, dashboards, plataformas empresariales.
3. MECATRÓNICA Y AUTOMATIZACIÓN - Robótica, automatización industrial, IoT, sensores, control.
4. CONSULTORÍAS Y PROTOTIPOS - Asesoría en ingeniería, prototipos, innovación hardware y software.

CONTACTO: info@elganext.com, WhatsApp: +573017250231

INSTRUCCIONES IMPORTANTES:
- NO uses asteriscos ni símbolos especiales en las respuestas
- NO saludes en cada mensaje, solo la primera vez si es apropiado
- Sé directo y conciso
- Menciona que soy una IA desarrollada por Bevans solo si me preguntan qué soy
- Recomienda servicios según necesidades
- Invita a contactar para cotizaciones cuando sea relevante

Pregunta: ${message}`;

        console.log("Sending request to Google AI...");
        const result = await model.generateContent(systemContext);
        const response = await result.response;
        const text = response.text();
        console.log("AI Response received");

        res.json({ reply: text });
    } catch (error) {
        console.error("AI Generation Error:", error);
        res.status(500).json({ error: error.message || 'AI Error' });
    }
});

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const result = await saveContact(name, email, subject, message);

        if (sendWhatsAppNotification) {
            try {
                const whatsappNumber = '+573017250231';
                await sendWhatsAppNotification(name, email, subject, message, whatsappNumber);
            } catch (whatsappError) {
                console.log('WhatsApp notification failed:', whatsappError.message);
            }
        }

        res.json(result);
    } catch (error) {
        console.error("Contact form error:", error);
        res.status(500).json({ error: error.message || 'Error saving contact' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
