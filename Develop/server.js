const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
var PORT = process.env.PORT || 3001







app.listen(3001,() => {
    console.log(`API server not on port 3001`);
});