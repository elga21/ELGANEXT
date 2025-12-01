# 🚀 GUÍA DE DEPLOYMENT - ELGANEXT

## Despliegue en Render.com con GitHub

Esta guía te llevará paso a paso para publicar ELGANEXT en internet usando Render.com (gratis) y GitHub.

---

## 📋 PASO 1: Preparar el Proyecto

**Ya está listo** ✅ El proyecto ya tiene todos los archivos necesarios:
- `.gitignore` - Para no subir archivos sensibles
- `.env.example` - Template de variables de entorno
- `package.json` - Con todas las dependencias

---

## 🔐 PASO 2: Crear Repositorio en GitHub

### 2.1 Crear el Repositorio

1. Ve a https://github.com
2. Haz login (o crea una cuenta si no tienes)
3. Click en el botón **"+"** (arriba derecha) → **"New repository"**
4. Configura:
   - **Repository name:** `elganext-website`
   - **Description:** `ELGANEXT - Organización Tecnológica`
   - **Visibility:** Public (o Private si prefieres)
   - **NO** marques "Add a README file" (ya tenemos uno)
   - Click **"Create repository"**

### 2.2 Subir el Código

Abre la terminal en la carpeta del proyecto y ejecuta:

```bash
# Inicializar Git
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit - ELGANEXT website"

# Conectar con GitHub (reemplaza TU_USUARIO)
git remote add origin https://github.com/TU_USUARIO/elganext-website.git

# Subir el código
git branch -M main
git push -u origin main
```

**¿Te pide usuario/contraseña?**
- Usa tu usuario de GitHub
- Para la contraseña, necesitas un **Personal Access Token**:
  1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  2. Generate new token → Marca "repo" → Generate
  3. Copia el token y úsalo como contraseña

---

## 🌐 PASO 3: Configurar Render.com

### 3.1 Crear Cuenta en Render

1. Ve a https://render.com
2. Click **"Get Started"** o **"Sign Up"**
3. **Importante:** Regístrate usando **"Sign up with GitHub"**
   - Esto conectará automáticamente tu cuenta de GitHub
4. Autoriza a Render para acceder a tus repositorios

### 3.2 Crear el Web Service

1. En el Dashboard de Render, click **"New +"** → **"Web Service"**

2. **Conecta tu repositorio:**
   - Busca `elganext-website` en la lista
   - Click **"Connect"**
   - Si no aparece, click "Configure account" y da acceso

3. **Configura el servicio:**
   
   **Name:** `elganext` (o el que prefieras)
   
   **Region:** `Oregon (US West)` o el más cercano
   
   **Branch:** `main`
   
   **Runtime:** `Node`
   
   **Build Command:** `npm install`
   
   **Start Command:** `npm start`
   
   **Instance Type:** `Free`

4. Click **"Advanced"** para configurar variables de entorno

### 3.3 Configurar Variables de Entorno

En la sección **Environment Variables**, añade las siguientes:

```
PORT = 3000
JWT_SECRET = williamwallace
GEMINI_API_KEY = [TU_CLAVE_DE_GEMINI]
WHATSAPP_NUMBER = +573017250231
```

**Opcional (si configuraste Twilio):**
```
TWILIO_ACCOUNT_SID = [TU_ACCOUNT_SID]
TWILIO_AUTH_TOKEN = [TU_AUTH_TOKEN]
TWILIO_WHATSAPP_NUMBER = whatsapp:+14155238886
```

**⚠️ IMPORTANTE:** Asegúrate de poner tu **GEMINI_API_KEY real**

5. Click **"Create Web Service"**

---

## ⏳ PASO 4: Esperar el Deployment

Render automáticamente:
1. ✅ Clonará tu repositorio
2. ✅ Instalará las dependencias (`npm install`)
3. ✅ Iniciará el servidor (`npm start`)

**Esto toma 2-5 minutos.** Verás los logs en tiempo real.

Cuando veas: `Your service is live 🎉` → ¡Está listo!

---

## 🎉 PASO 5: Acceder a tu Web

Tu sitio estará disponible en:
```
https://elganext.onrender.com
```
(O el nombre que hayas elegido)

**Comparte este link** y tu web será accesible desde cualquier parte del mundo. 🌍

---

## 🔄 PASO 6: Actualizar tu Web (Futuros Cambios)

Cada vez que hagas cambios:

```bash
# 1. Agregar los cambios
git add .

# 2. Hacer commit
git commit -m "Descripción de los cambios"

# 3. Subir a GitHub
git push

# 4. Render detectará los cambios y redesplegará automáticamente
```

---

## 🛠️ CONFIGURACIONES ADICIONALES

### Dominio Personalizado (Opcional)

Si tienes un dominio (ej: `elganext.com`):

1. En Render → Settings → Custom Domain
2. Añade tu dominio
3. Configura los DNS en tu proveedor según las instrucciones

### Base de Datos (Si crece el proyecto)

Actualmente usa archivos XLSX. Para producción real considera:
- PostgreSQL (Render lo ofrece gratis)
- MongoDB Atlas (gratis)

### WhatsApp en Producción

Para WhatsApp en producción:
1. Upgrade de Twilio (plan de pago)
2. O mantener el sandbox (gratis pero limitado)

---

## ❓ SOLUCIÓN DE PROBLEMAS

### "Build failed"
- Verifica que `package.json` tenga todas las dependencias
- Revisa los logs de build en Render

### "Application error"
- Verifica las variables de entorno en Render
- Asegúrate de que `GEMINI_API_KEY` sea válida
- Revisa los logs en Render → Logs

### No carga la página
- Espera 2-3 minutos (el servicio gratis puede estar "dormido")
- Verifica que el servicio esté "Running" en Render

### Archivos XLSX no persisten
- En Render Free, los archivos se borran al redesplegar
- Solución: Migra a una base de datos real (PostgreSQL)

---

## 📞 SOPORTE

- Render Docs: https://render.com/docs
- GitHub Docs: https://docs.github.com
- Twilio Docs: https://www.twilio.com/docs

---

## ✅ CHECKLIST FINAL

- [ ] Código subido a GitHub
- [ ] Repositorio conectado a Render
- [ ] Variables de entorno configuradas
- [ ] Deployment exitoso
- [ ] Web accesible en el link de Render
- [ ] Todas las funciones probadas

---

**🎊 ¡FELICIDADES! Tu sitio ELGANEXT está en línea y accesible desde todo el mundo.**
