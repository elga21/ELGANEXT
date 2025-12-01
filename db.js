const bcrypt = require('bcryptjs');

// Almacenamiento en memoria (temporal mientras migramos a base de datos real)
let users = [];
let contacts = [];

// Simulamos las funciones de base de datos
function findUser(username) {
    return users.find(u => u.username === username);
}

async function registerUser(username, password) {
    const existingUser = findUser(username);
    if (existingUser) {
        throw new Error('El usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        username,
        password: hashedPassword,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    console.log(`✅ Usuario registrado: ${username}`);
    return { success: true };
}

async function loginUser(username, password) {
    const user = findUser(username);

    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        throw new Error('Contraseña incorrecta');
    }

    return { success: true, username: user.username };
}

async function saveContact(name, email, subject, message) {
    const newContact = {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
    };

    contacts.push(newContact);
    console.log(`✅ Contacto guardado: ${name} - ${email}`);
    return { success: true };
}

// Funciones auxiliares para exportar
function getUsers() {
    return users;
}

function getContacts() {
    return contacts;
}

module.exports = {
    registerUser,
    loginUser,
    saveContact,
    getUsers,
    getContacts
};
