const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const utils = require("./helpers/fsUtils")
const app = express();
var PORT = process.env.PORT || 3001


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);



// API Listening
app.listen(3001,() => {
    console.log(`API server on port 3001`);
});