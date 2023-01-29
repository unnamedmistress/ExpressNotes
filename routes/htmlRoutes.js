// Import required modules
const express = require("express");
const router = express.Router();
const path = require("path");

// Route to serve the notes.html file
router.get("/notes", function (req, res) {
// Use the res.sendFile method to send the file located at the specified path
res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// Route to serve the index.html file for all other routes
router.get("/*", function (req, res) {
// Use the res.sendFile method to send the file located at the specified path
res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Export the router object
module.exports = router;