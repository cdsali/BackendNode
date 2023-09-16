const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Create MySQL connection pool
const db = mysql.createPool({
    host: 'localhost', // Replace with your database host
    user: 'root',
    password: '123456789',
    database: 'sastanaqqam',
    dateStrings: 'date'
  
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); // Allow cross-origin requests

// Define the route to handle the contact form submission
app.post('/submit', (req, res) => {
    console.log('Form submission received.');

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let now = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

    const { name, email, subject, message } = req.body;

    // Store the form data in the MySQL database
    const sql = 'INSERT INTO contact (NAME, EMAIL, SUBJECT, MESSAGE, DATE) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, email, subject, message, now], (err, result) => {
        if (err) {
            console.error('Error storing data to database:', err);
            return res.status(500).json({ error: 'An error occurred while processing your request.' });
        }

        console.log('Data stored successfully in the database.');
        return res.status(200).json({ message: 'Data stored successfully.' });
    });
});

// Modify the existing /submit endpoint to also fetch messages
app.post('/blogs', (req, res) => {
   
    const fetchSql = 'SELECT * FROM blog';
    db.query(fetchSql, (err, results) => {
        if (err) {
            console.error('Error fetching data from database:', err);
            return res.status(500).json({ error: 'An error occurred while fetching data.' });
        }

        res.status(200).json(results);
    });
});

app.get('/blogs/article/:ID_Blog', (req, res) => {
    const ID_Blog = parseInt(req.params.ID_Blog);
    console.log(req.params.ID_Blog);
    const fetchSql = 'SELECT * FROM article where ID_B= ?';
    db.query(fetchSql, [ID_Blog], (err, results) => {
        if (err) {
            console.error('Error fetching data from database:', err);
            return res.status(500).json({ error: 'An error occurred while fetching data.' });
        }
        console.log(results);

        res.status(200).json(results);
    });

  
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
