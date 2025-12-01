const twilio = require('twilio');

let twilioClient = null;
let isConfigured = false;

function initializeWhatsApp() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioNumber = process.env.TWILIO_WHATSAPP_NUMBER;

    if (accountSid && authToken && twilioNumber) {
        try {
            twilioClient = twilio(accountSid, authToken);
            isConfigured = true;
            console.log('✅ Twilio WhatsApp initialized');
        } catch (error) {
            console.error('❌ Error initializing Twilio:', error.message);
        }
    } else {
        console.log('⚠️ Twilio WhatsApp not configured (check .env file)');
    }
}

async function sendWhatsAppNotification(name, email, subject, message, phoneNumber) {
    if (!isConfigured || !twilioClient) {
        console.log('⚠️ Twilio not configured, skipping WhatsApp notification');
        return { success: false, message: 'Twilio not configured' };
    }

    try {
        const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER;

        // Format: whatsapp:+573017250231
        const to = `whatsapp:${phoneNumber}`;
        const from = twilioWhatsAppNumber;

        const messageText = `🔔 *NUEVO MENSAJE DE CONTACTO - ELGANEXT*\n\n` +
            `👤 *Nombre:* ${name}\n` +
            `📧 *Email:* ${email}\n` +
            `📌 *Asunto:* ${subject}\n\n` +
            `💬 *Mensaje:*\n${message}\n\n` +
            `⏰ ${new Date().toLocaleString('es-CO')}`;

        const result = await twilioClient.messages.create({
            from: from,
            to: to,
            body: messageText
        });

        console.log('✅ WhatsApp message sent successfully:', result.sid);
        return { success: true, messageSid: result.sid };
    } catch (error) {
        console.error('❌ Error sending WhatsApp message:', error.message);
        return { success: false, message: error.message };
    }
}

function isWhatsAppReady() {
    return isConfigured;
}

module.exports = {
    initializeWhatsApp,
    sendWhatsAppNotification,
    isWhatsAppReady
};
