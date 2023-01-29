const express = require("express");
const router = express.Router();

// Import the uuid library for generating unique ids
const { v4: uuid } = require("uuid");

// Import the DB class for database operations
const DB = require("../db/DB");

// Route to get all notes
router.get("/api/notes", async (req, res) => {
// Read the notes from the database
const notes = await DB.readNotes();
// Return the notes as a JSON response
return res.json(notes);
});

// Route to add a new note
router.post("/api/notes", async (req, res) => {
// Read the current notes from the database
const currentNotes = await DB.readNotes();
// Create the new note with a unique id, title, and text
const newNote = {
id: uuid(),
title: req.body.title,
text: req.body.text,
};
// Add the new note to the current notes
const updatedNotes = [...currentNotes, newNote];
// Write the updated notes to the database
await DB.addNote(updatedNotes);
// Return the new note as a JSON response
return res.send(newNote);
});

// Route to delete a note
router.delete("/api/notes/:id", async (req, res) => {
// Read the id of the note to delete from the URL parameters
const noteIdToDelete = req.params.id;
// Read the current notes from the database
const currentNotes = await DB.readNotes();
// Filter the current notes to exclude the note with the specified id
const updatedNotes = currentNotes.filter((note) => note.id !== noteIdToDelete);
// Write the updated notes to the database
await DB.deleteNote(updatedNotes);
// Return the updated notes as a JSON response
return res.send(updatedNotes);
});

module.exports = router;