const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

// mysql connection
var connection = require('../db.js');

router.post('/', (req, res) => {
    const { username, password } = req.body;

    // if empty
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // query to find user
    const query = 'SELECT * FROM users INNER JOIN houses USING(house_id) WHERE username = ?'; // ? is the placeholder

    // execute query
    connection.query(query, [username], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        // Check if user exists
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = results[0];


        // Check if password matches
        if (user.password != password) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        // If password matches, login successful
        res.json({ 
            first_name: user.first_name, 
            last_name: user.last_name, 
            gender: user.gender, 
            house: user.house, 
            quote: user.quote, 
            house_id: user.house_id, 
            founder: user.founder, 
            founder_description: user.founder_description 
        });

    });

});

module.exports = router;