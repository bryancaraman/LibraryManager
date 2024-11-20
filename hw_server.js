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

app.post('/retrieve_user', (req, res) => {
    const { userID, email, phone } = req.body;

    let sql = `SELECT * FROM Users WHERE User_ID = '${userID}'`;

    if (email) {
        sql += ` OR UEmail = '${email}'`;
    }
    if (phone) {
        sql += ` OR PhoneNum = '${phone}'`;
    }

    console.log(`Executing SQL query: ${sql}`); 

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving user:', err);
            res.status(500).send('Error retrieving user');
            return;
        }
        res.json(results); 
    });
});

app.post('/update_user', (req, res) => {
    const { userID, email, phone, address } = req.body;

    let sql = 'UPDATE Users SET';
    const params = [];

    if (email) {
        sql += ' UEmail = ?,';
        params.push(email);
    }
    if (phone) {
        sql += ' PhoneNum = ?,';
        params.push(phone);
    }
    if (address) {
        sql += ' Address = ?,';
        params.push(address);
    }

    sql = sql.slice(0, -1);
    sql += ' WHERE User_ID = ?';
    params.push(userID);

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            res.status(500).send('Error updating user');
            return;
        }
        res.send('User updated successfully');
    });
});

app.post('/prepared_retrieve_user', (req, res) => {
    const { userID, email, phone } = req.body;

    if (!userID || !email || !phone) {
        return res.status(400).send('All fields (userID, email, phone) are required.');
    }

    const sql = 'SELECT * FROM Users WHERE User_ID = ? AND UEmail = ? AND PhoneNum = ?';
    const params = [userID, email, phone]; 

    db.execute(sql, params, (err, results) => {
        if (err) {
            console.error('Error retrieving user:', err);
            res.status(500).send('Error retrieving user');
            return;
        }

        if (results.length === 0) {
            return res.status(404).send('No user found with the provided information.');
        }

        res.json(results);
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
