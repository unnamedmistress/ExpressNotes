const fs = require('fs');

const path = require('path');

function noteCreateNewNote (body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../lib/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

function noteValidateNote (note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

function noteFindById (id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

function noteDeleteNote (id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];
        if (note.id === id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, '../lib/db.json'),
                JSON.stringify({ notes: notesArray }, null, 2)
            );
            break;
        }
    }
}
module.exports = noteDeleteNote, noteFindById, noteValidateNote, noteCreateNewNote;