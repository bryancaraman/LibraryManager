const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname)));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'library'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.post('/add_user', (req, res) => {
    const { userID, email, phone, address } = req.body;
    const sql = 'INSERT INTO Users (User_ID, UEmail, PhoneNum, Address) VALUES (?, ?, ?, ?)';
    db.query(sql, [userID, email, phone, address], (err, result) => {
        if (err) throw err;
        res.send('User added successfully');
    });
});

app.get('/view_users', (req, res) => {
    const sql = 'SELECT * FROM Users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/update_user', (req, res) => {
    const { userID, email, phone, address } = req.body;
    const sql = 'UPDATE Users SET UEmail = ?, PhoneNum = ?, Address = ? WHERE User_ID = ?';
    db.query(sql, [email, phone, address, userID], (err, result) => {
        if (err) throw err;
        res.send('User updated successfully');
    });
});

app.post('/delete_user', (req, res) => {
    const { userID } = req.body;
    const sql = 'DELETE FROM Users WHERE User_ID = ?';
    db.query(sql, [userID], (err, result) => {
        if (err) throw err;
        res.send('User deleted successfully');
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/user_management', (req, res) => {
    res.sendFile(path.join(__dirname, 'forms/user_management.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});