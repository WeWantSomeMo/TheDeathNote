const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const utils = require("./helpers/fsUtils")
const app = express();
var PORT = process.env.PORT || 3001

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

// HTML CALLS

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
    console.log('ln 18 server.js')
});
//call for notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});



// Add new notes to db.json
app.get("/api/notes", (req, res) => {
    utils.readFromFile("./db/db.json").then(data => res.json(JSON.parse(data)))
});

app.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"))
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes);
});

// Deleting Notes
app.delete("/api/notes/:id", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(delNote));
    res.json(delNote);
})



// API Listening
app.listen(3001,() => {
    console.log(`API server on port 3001`);
});