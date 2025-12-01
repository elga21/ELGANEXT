# 📱 Configuración de WhatsApp - ELGANEXT

## ⚡ Activación Rápida

### Tu Código de Sandbox
```
GYLGJJ5P48EZSBYG6XPCAQY1  
```

### Paso 1: Conectar WhatsApp
1. Abre **WhatsApp** en tu teléfono (+573017250231)
2. Inicia un nuevo chat con: **+1 415 523 8886**
3. Envía exactamente este mensaje:
   ```
   join GYLGJJ5P48EZSBYG6XPCAQY1
   ```
4. Espera la confirmación de Twilio (recibirás un mensaje)

✅ **¡Listo!** Tu WhatsApp ya está conectado al sandbox.

---

## 🔑 Paso 2: Obtener Credenciales

1. Ve a tu **Dashboard de Twilio**: https://console.twilio.com
2. En la página principal verás:

### Account SID
- Empieza con `AC...`
- Cópialo completo

### Auth Token  
- Haz clic en "Show" para verlo
- Cópialo completo

### WhatsApp Number
- Ya lo tienes: `whatsapp:+14155238886`

---

## ⚙️ Paso 3: Configurar .env

Abre el archivo `.env` y actualiza:

```bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=tu_token_de_32_caracteres
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

**IMPORTANTE:**
- No pongas espacios
- No pongas comillas
- El Account SID debe empezar con `AC`
- El número debe llevar `whatsapp:` al inicio

---

## 🚀 Paso 4: Probar

1. **Reinicia el servidor:**
   ```bash
   npm start
   ```

2. **Deberías ver:**
   ```
   ✅ Twilio WhatsApp initialized
   Server running on http://localhost:3000
   ```

3. **Prueba el formulario:**
   - Ve a http://localhost:3000/contact.html
   - Llena el formulario
   - Envía
   - ✅ Recibirás el mensaje en tu WhatsApp!

---

## 📧 Formato del Mensaje

Cuando alguien llene el formulario, recibirás:

```
🔔 NUEVO MENSAJE DE CONTACTO - ELGANEXT

👤 Nombre: Juan Pérez
📧 Email: juan@email.com  
📌 Asunto: Consulta sobre servicios

💬 Mensaje:
Hola, me interesa conocer más...

⏰ 01/12/2025 15:30:00
```

---

## ❌ Solución de Problemas

### "accountSid must start with AC"
- Verifica que copiaste el AC completo
- Sin espacios al inicio o final

### "Twilio not configured"
- Revisa que las 3 variables estén en .env
- Reinicia el servidor después de editar .env

### No recibo mensajes
- Verifica que enviaste `join GYLGJJ5P48EZSBYG6XPCAQY1`  
- Revisa que uses el mismo número (+573017250231)
- El sandbox está activo (revisa en console.twilio.com)

---

## 💰 Plan Gratuito

- ✅ Crédito de prueba incluido
- ✅ Suficiente para cientos de mensajes
- ✅ No requiere tarjeta de crédito inicialmente
- ✅ Sandbox ilimitado durante desarrollo

---

## 🔗 Enlaces Útiles

- Dashboard: https://console.twilio.com
- Documentación WhatsApp: https://www.twilio.com/docs/whatsapp
- Sandbox: https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn

---

**¿Problemas?** El soporte de Twilio es excelente, puedes contactarlos directamente.
