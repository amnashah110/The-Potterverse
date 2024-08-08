const express = require('express');

const router = express.Router();

// mysql connection
var connection = require('../db.js');

router.post('/', (req, res) => {
    const { house_id } = req.body;

    // query to find characters
    const query = 'SELECT * FROM characters WHERE house_id = ?'; // ? is the placeholder
    const queryTrait = 'SELECT * FROM traits WHERE house_id = ?'

    // execute query
    connection.query(query, [house_id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        // Check if user exists
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const characters = results.map(row => ({
            id: row.id,
            name: row.name,
            description: row.description,
        }));

        connection.query(queryTrait, [house_id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal server error' });
            }
    
            // Check if user exists
            if (results.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            const traits = results.map(row => ({
                trait: row.trait
            }));

            res.json({characters, traits});
        });
    });
});

module.exports = router;