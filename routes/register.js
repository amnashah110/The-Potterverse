const express = require('express');

const router = express.Router();

// mysql connection
var connection = require('../db.js');

router.post('/', (req, res) => {
    const { firstName, lastName, username, password, houseID } = req.body;
    
    const query = 'INSERT INTO users(first_name, last_name, username, password, house_id) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [firstName, lastName, username, password, houseID], (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ message: 'Database error' });
        }
        return res.status(200).json({ message: 'User created successfully' });
    });
});

router.get('/', (req, res) => {
    const query = 'SELECT * FROM questions';
    connection.query(query, [], (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ message: 'Database error' });
        }

        const questions = results.map(row => ({
            question: row.question,
            question_heading: row.question_heading
        }));

        return res.json({questions});
    });
});

router.get('/options', (req, res) => {
    const { question_id } = req.query;
    const query = 'SELECT * FROM options WHERE question_id = ?';
    connection.query(query, [question_id], (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ message: 'Database error' });
        }

        const options = results.map(row => ({
            options: row.options,
            house_id: row.house_id
        }));

        return res.json({options});
    });
});

module.exports = router;