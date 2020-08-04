// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware */
// Configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder (client-side code)
app.use(express.static('website'));

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Setup Server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on localhost port: ${port}`);
});

// Get all `projectData`
app.get('/all', (req, res) => {
    res.send(projectData);
});

// Post new weather data to be appended to `projectData`
app.post('/add', (req, res) => {
    projectData[req.body.zipCode] = req.body;
    res.send(`Weather data for zip code: ${req.body.zipCode} has been added successfully`);
});