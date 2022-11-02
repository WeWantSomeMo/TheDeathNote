const router = require('express').Router();
const uuid = require('../helpers/uuid');
const utils = require('../helpers/fsUtils');

// GET "/api/notes" responds with all notes from the database
router.get('/notes', (req, res) => {
  utils.readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST /api/notes
router.post('/notes', (req, res) => {
  let newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuid(),
  };
  utils.readAndAppend(newNote, './db/db.json');
  const response = {
    status: 'success',
    body: newNote,
  };
  res.json(response);
});

// DELETE "/api/notes" deletes the note with an id equal to req.params.id
router.delete('/notes/:id', (req, res) => {
  let noteID = req.params.id;
  utils.readAndRemove(noteID, './db/db.json');
  const response = {
    status: 'success',
  };
  res.json(response);
});

module.exports = router;