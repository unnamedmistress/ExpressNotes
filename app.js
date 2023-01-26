const express = require('express');
const fs = require('fs'); // for reading and writing to db.json
const path = require('path'); // for joining path to access files
const bodyParser = require('body-parser'); // middleware for parsing incoming request bodies
const PORT = 5001;

const app = express();

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json

app.use(express.static('public')); // serve static files in the public folder

app.get('*', (req, res) => {
// send index.html file when any route other than /api/notes is accessed
res.sendFile(path.join(__dirname, '/Develop/public/index.html'));
});

app.get('/api/notes', (req, res) => {
// read db.json file and return all saved notes as JSON
fs.readFile('./db/db.json', 'utf8', (err, data) => {
if (err) throw err;
res.json(JSON.parse(data));
});
});

app.post('/api/notes', (req, res) => {
// receive new note on request body, add it to db.json with a unique id, and return it to the client
fs.readFile('./db/db.json', 'utf8', (err, data) => {
if (err) throw err;
const notes = JSON.parse(data);
const newNote = req.body;
newNote.id = notes.length + 1;
notes.push(newNote);
fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
if (err) throw err;
res.json(newNote);
});
});
})

app.listen(PORT, () => {
console.log(`Example app listening at http://localhost:${PORT}`);
});