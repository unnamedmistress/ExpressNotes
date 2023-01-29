const express = require('express');
const PORT = process.env.PORT || 5001;

const app = express();

// Middleware for parsing incoming request bodies
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(express.json()); // parse application/json

// Serve static files in the public folder
app.use(express.static('public'));

// Import and use API and HTML routes
const apiRoutes = require('./routes/apiRoutes');
app.use(apiRoutes);
const htmlRoutes = require('./routes/htmlRoutes');
app.use(htmlRoutes);

// Start the Express server
app.listen(PORT, () => {
console.log(`Server listening at http://localhost:${PORT}`);
});