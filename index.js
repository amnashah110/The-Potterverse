const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // load environment variables

const app = express();
const port = process.env.PORT || 2000;

// enable CORS
app.use(cors());

// middleware for form data
app.use(express.urlencoded({ extended: true }));

// middleware for JSON objects
app.use(express.json());

// routes
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));
app.use('/userpage', require('./routes/userpage'));

app.post('/', (req, res) => {
    res.json("Hello");
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});