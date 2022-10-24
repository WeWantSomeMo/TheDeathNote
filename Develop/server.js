const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const app = express();
var PORT = process.env.PORT || 3001


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("./public"));


// Add new notes to db.json
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/dc.json"))
});
const newNotes = req.body;
newNotes.id = uuid.v4();
notes.push(newNotes);
fs.writeFileSync("./db/db.json", JSON.stringify(notes))
res.json(notes);

// Deleting Notes
app.delete("/api/notes/:id", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(delNote));
    res.json(delNote);
})

// HTML Calls for index
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
//call for notes.html
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// API Listening
app.listen(3001,() => {
    console.log(`API server on port 3001`);
});