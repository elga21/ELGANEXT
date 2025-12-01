const xlsx = require('xlsx');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'users.xlsx');
const SECRET_KEY = process.env.JWT_SECRET || 'williamwallace';

// Initialize DB if not exists
if (!fs.existsSync(DB_FILE)) {
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet([]);
    xlsx.utils.book_append_sheet(wb, ws, 'Users');
    xlsx.writeFile(wb, DB_FILE);
}

function getUsers() {
    const wb = xlsx.readFile(DB_FILE);
    const ws = wb.Sheets['Users'];
    return xlsx.utils.sheet_to_json(ws);
}

function saveUser(user) {
    const users = getUsers();
    users.push(user);
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(users);
    xlsx.utils.book_append_sheet(wb, ws, 'Users');
    xlsx.writeFile(wb, DB_FILE);
}

async function registerUser(username, password) {
    const users = getUsers();
    if (users.find(u => u.username === username)) {
        throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    saveUser({ username, password: hashedPassword });
    return { message: 'User registered successfully' };
}

async function loginUser(username, password) {
    const users = getUsers();
    const user = users.find(u => u.username === username);
    if (!user) {
        throw new Error('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    return { token, username };
}

async function saveContact(name, email, subject, message) {
    const CONTACT_DB = path.join(__dirname, 'contacts.xlsx');

    // Initialize contact DB if not exists
    if (!fs.existsSync(CONTACT_DB)) {
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet([]);
        xlsx.utils.book_append_sheet(wb, ws, 'Contacts');
        xlsx.writeFile(wb, CONTACT_DB);
    }

    // Read existing contacts
    const wb = xlsx.readFile(CONTACT_DB);
    const ws = wb.Sheets['Contacts'];
    const contacts = xlsx.utils.sheet_to_json(ws);

    // Add new contact with timestamp
    contacts.push({
        name,
        email,
        subject,
        message,
        date: new Date().toISOString()
    });

    // Save back to file
    const newWb = xlsx.utils.book_new();
    const newWs = xlsx.utils.json_to_sheet(contacts);
    xlsx.utils.book_append_sheet(newWb, newWs, 'Contacts');
    xlsx.writeFile(newWb, CONTACT_DB);

    return { message: 'Contact form submitted successfully' };
}

module.exports = { registerUser, loginUser, saveContact };
