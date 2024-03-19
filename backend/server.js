// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Create MySQL connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'tuf_task'
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// Handle POST request to submit a code snippet
app.post('/submit', (req, res) => {
    const { username, language, stdin, source_code } = req.body;
    const INSERT_SNIPPET_QUERY = `INSERT INTO snippets (username, language, stdin, source_code) VALUES (?, ?, ?, ?)`;
    db.query(INSERT_SNIPPET_QUERY, [username, language, stdin, source_code], (err, result) => {
        if (err) {
            console.error('Error submitting snippet:', err);
            res.status(500).json({ error: 'Error submitting snippet' });
        } else {
            console.log('Snippet submitted successfully');
            res.status(200).json({ message: 'Snippet submitted successfully' });
        }
    });
});

// Handle GET request to retrieve all submitted snippets
app.get('/snippets', (req, res) => {
    const SELECT_SNIPPETS_QUERY = `SELECT id, username, language, stdin, LEFT(source_code, 100) as source_code, timestamp FROM snippets`;
    db.query(SELECT_SNIPPETS_QUERY, (err, results) => {
        if (err) {
            console.error('Error fetching snippets:', err);
            res.status(500).json({ error: 'Error fetching snippets' });
        } else {
            console.log('Snippets fetched successfully');
            res.status(200).json(results);
        }
    });
});
