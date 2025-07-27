const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Use CORS
app.use(cors());

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

// Sample login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Replace with your authentication logic
    if (username === 'admin' && password === 'password') {
        res.status(200).send({ message: 'Login successful' });
    } else {
        res.status(401).send({ message: 'Login failed' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
