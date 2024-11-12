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
    db.query(sql, [userID, email, phone, address], (err) => {
        if (err) throw err;
        res.send('User added successfully');
    });
});

app.post('/update_user', (req, res) => {
    const { userID, email, phone, address } = req.body;
    const sql = 'UPDATE Users SET UEmail = ?, PhoneNum = ?, Address = ? WHERE User_ID = ?';
    db.query(sql, [email, phone, address, userID], (err) => {
        if (err) throw err;
        res.send('User updated successfully');
    });
});

app.post('/delete_user', (req, res) => {
    const { userID } = req.body;
    const sql = 'DELETE FROM Users WHERE User_ID = ?';
    db.query(sql, [userID], (err) => {
        if (err) throw err;
        res.send('User deleted successfully');
    });
});

app.get('/view_users', (req, res) => {
    const sql = 'SELECT * FROM Users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/add_user_name', (req, res) => {
    const { userID, fName, mInit, lName } = req.body;
    const sql = 'INSERT INTO Users_name (User_ID, FName, MInit, LName) VALUES (?, ?, ?, ?)';
    db.query(sql, [userID, fName, mInit, lName], (err) => {
        if (err) throw err;
        res.send('User name added successfully');
    });
});

app.post('/update_user_name', (req, res) => {
    const { userID, fName, mInit, lName } = req.body;
    const sql = 'UPDATE Users_name SET FName = ?, MInit = ?, LName = ? WHERE User_ID = ?';
    db.query(sql, [fName, mInit, lName, userID], (err) => {
        if (err) throw err;
        res.send('User name updated successfully');
    });
});

app.post('/delete_user_name', (req, res) => {
    const { userID } = req.body;
    const sql = 'DELETE FROM Users_name WHERE User_ID = ?';
    db.query(sql, [userID], (err) => {
        if (err) throw err;
        res.send('User name deleted successfully');
    });
});

app.get('/view_user_names', (req, res) => {
    const sql = 'SELECT * FROM Users_name';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/add_book', (req, res) => {
    const { bookID, title, author, copiesInStock } = req.body;
    const sql = 'INSERT INTO Books (Book_ID, Title, Author, CopiesInStock) VALUES (?, ?, ?, ?)';
    db.query(sql, [bookID, title, author, copiesInStock], (err) => {
        if (err) throw err;
        res.send('Book added successfully');
    });
});

app.post('/update_book', (req, res) => {
    const { bookID, title, author, copiesInStock } = req.body;
    const sql = 'UPDATE Books SET Title = ?, Author = ?, CopiesInStock = ? WHERE Book_ID = ?';
    db.query(sql, [title, author, copiesInStock, bookID], (err) => {
        if (err) throw err;
        res.send('Book updated successfully');
    });
});

app.post('/delete_book', (req, res) => {
    const { bookID } = req.body;
    const sql = 'DELETE FROM Books WHERE Book_ID = ?';
    db.query(sql, [bookID], (err) => {
        if (err) throw err;
        res.send('Book deleted successfully');
    });
});

app.get('/view_books', (req, res) => {
    const sql = 'SELECT * FROM Books';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/add_librarian', (req, res) => {
    const { librarianID, libEmail } = req.body;
    const sql = 'INSERT INTO Librarians (Librarian_ID, LibEmail) VALUES (?, ?)';
    db.query(sql, [librarianID, libEmail], (err) => {
        if (err) throw err;
        res.send('Librarian added successfully');
    });
});

app.post('/update_librarian', (req, res) => {
    const { librarianID, libEmail } = req.body;
    const sql = 'UPDATE Librarians SET LibEmail = ? WHERE Librarian_ID = ?';
    db.query(sql, [libEmail, librarianID], (err) => {
        if (err) throw err;
        res.send('Librarian updated successfully');
    });
});

app.post('/delete_librarian', (req, res) => {
    const { librarianID } = req.body;
    const sql = 'DELETE FROM Librarians WHERE Librarian_ID = ?';
    db.query(sql, [librarianID], (err) => {
        if (err) throw err;
        res.send('Librarian deleted successfully');
    });
});

app.get('/view_librarians', (req, res) => {
    const sql = 'SELECT * FROM Librarians ORDER BY Librarian_ID';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/add_librarian_name', (req, res) => {
    const { librarianID, lFName, lMInit, lLName } = req.body;
    const sql = 'INSERT INTO Librarians_name (Librarian_ID, L_FName, L_MInit, L_LName) VALUES (?, ?, ?, ?)';
    db.query(sql, [librarianID, lFName, lMInit, lLName], (err) => {
        if (err) throw err;
        res.send('Librarian name added successfully');
    });
});

app.post('/update_librarian_name', (req, res) => {
    const { librarianID, lFName, lMInit, lLName } = req.body;
    const sql = 'UPDATE Librarians_name SET L_FName = ?, L_MInit = ?, L_LName = ? WHERE Librarian_ID = ?';
    db.query(sql, [lFName, lMInit, lLName, librarianID], (err) => {
        if (err) throw err;
        res.send('Librarian name updated successfully');
    });
});

app.post('/delete_librarian_name', (req, res) => {
    const { librarianID } = req.body;
    const sql = 'DELETE FROM Librarians_name WHERE Librarian_ID = ?';
    db.query(sql, [librarianID], (err) => {
        if (err) throw err;
        res.send('Librarian name deleted successfully');
    });
});

app.get('/view_librarian_names', (req, res) => {
    const sql = 'SELECT * FROM Librarians_name';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/view_checked_out', (req, res) => {
    const sql = `
        SELECT c.Checkout_ID, c.User_ID, u.UEmail, c.Book_ID, b.Title, c.Checkout_Date, c.Due_Date
        FROM Checkouts AS c
        JOIN Users AS u ON c.User_ID = u.User_ID
        JOIN Books AS b ON c.Book_ID = b.Book_ID
        WHERE c.Date_Returned IS NULL
    `;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/view_book_genre_assignments', (req, res) => {
    const sql = `
        SELECT b.Book_ID, b.Title, g.Genre_ID, g.GName
        FROM Belongs AS bg
        JOIN Books AS b ON bg.Book_ID = b.Book_ID
        JOIN Genres AS g ON bg.Genre_ID = g.Genre_ID
    `;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});