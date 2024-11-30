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
    const sql = `
        SELECT 
            Users.User_ID, 
            Users_name.FName, 
            Users_name.MInit, 
            Users_name.LName, 
            Users.UEmail, 
            Users.PhoneNum, 
            Users.Address
        FROM 
            Users
        INNER JOIN 
            Users_name 
        ON 
            Users.User_ID = Users_name.User_ID;
    `;
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
    const sql = 'SELECT * FROM Librarians, Librarians_name WHERE Librarians.Librarian_ID = Librarians_name.Librarian_ID ORDER BY Librarians.Librarian_ID';
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

app.post('/checkout_book', (req, res) => {
    const { userID, bookID, checkoutDate } = req.body;

    if (!userID || !bookID || !checkoutDate) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const dueDate = new Date(checkoutDate);
    dueDate.setDate(dueDate.getDate() + 14); 

    const sql = `
        INSERT INTO Checkouts (User_ID, Book_ID, Checkout_Date, Due_Date)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [userID, bookID, checkoutDate, dueDate.toISOString().split('T')[0]], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'An error occurred while checking out the book.' });
        }

        res.json({ message: 'Book checked out successfully.' });
    });
});

app.post('/return_book', (req, res) => {
    const { userID, bookID, returnDate } = req.body;
    if (!userID || !bookID || !returnDate) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const sql = `
        UPDATE Checkouts
        SET Date_Returned = ?
        WHERE User_ID = ? AND Book_ID = ? AND Date_Returned IS NULL
    `;

    db.query(sql, [returnDate, userID, bookID], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'An error occurred while updating the record.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'No matching checkout record found or book already returned.' });
        }

        res.json({ message: 'Book return recorded successfully.' });
    });
});

app.post('/add_genre', (req, res) => {
    const sql = `
        INSERT INTO Genres (Genre_ID, GName, Librarian_ID)
        VALUES (?, ?, ?)
    `;
    const { genreID, gName, librarianID } = req.body;

    db.query(sql, [genreID, gName, librarianID], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Genre added successfully.' });
    });
});

app.post('/update_genre', (req, res) => {
    const sql = `
        UPDATE Genres
        SET GName = ?, Librarian_ID = ?
        WHERE Genre_ID = ?
    `;
    const { genreID, gName, librarianID } = req.body;

    db.query(sql, [gName, librarianID, genreID], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Genre updated successfully.' });
    });
});

app.post('/delete_genre', (req, res) => {
    const sql = `
        DELETE FROM Genres
        WHERE Genre_ID = ?
    `;
    const { genreID } = req.body;

    db.query(sql, [genreID], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Genre deleted successfully.' });
    });
});

app.get('/view_genres', (req, res) => {
    const sql = `
        SELECT 
            Genre_ID, 
            GName, 
            Librarian_ID
        FROM Genres
        ORDER BY Genre_ID;
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'An error occurred while retrieving genres.' });
        }
        res.json(results);
    });
});

app.post('/assign_genre', (req, res) => {
    const sql = `
        INSERT INTO Belongs (Book_ID, Genre_ID)
        VALUES (?, ?)
    `;
    const { bookID, genreID } = req.body;

    db.query(sql, [bookID, genreID], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Book successfully assigned to genre.' });
    });
});

app.post('/remove_genre', (req, res) => {
    const sql = `
        DELETE FROM Belongs
        WHERE Book_ID = ? AND Genre_ID = ?
    `;
    const { bookID, genreID } = req.body;

    db.query(sql, [bookID, genreID], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Book successfully removed from genre.' });
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

app.get('/view_book_genres', (req, res) => {
    const sql = `
        SELECT 
            b.Book_ID, 
            b.Title AS Book_Title, 
            g.Genre_ID, 
            g.GName AS Genre_Name
        FROM Belongs AS bg
        JOIN Books AS b ON bg.Book_ID = b.Book_ID
        JOIN Genres AS g ON bg.Genre_ID = g.Genre_ID
        ORDER BY b.Book_ID, g.Genre_ID
    `;

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});