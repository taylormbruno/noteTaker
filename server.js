// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

let raw = fs.readFileSync('db/db.json');
let notes = JSON.parse(raw);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("/api/notes", function (req, res) {
    return res.json(notes);
});

app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    console.log(newNote);
});

app.delete("/api/notes:id")

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});