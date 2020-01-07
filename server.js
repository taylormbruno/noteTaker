// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

let raw = fs.readFileSync('db/db.json');
let notes = JSON.parse(raw);

if (notes[0].id === undefined) {
    writeId();
}

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
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
// app.get("/api/notes/:id", function (req, res) {
//     res.redirect("/notes");
// });

app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    console.log(newNote);
    notes.push(newNote);
    for (let i=0; i < notes.length; i++) {
        delete notes[i].id;
    }
    console.log(notes);
    writeId();
    let reverse = JSON.stringify(notes);
    fs.writeFileSync("./db/db.json", reverse, (err) => { if (err) throw err });
    res.redirect('back');
});


app.delete("/api/notes/:id", function (req,res) {
    res.send("Received DELETE request");
    let remID = req.params.id;
    notes.splice((remID - 1), 1);
    console.log(notes + " after splice \n");

    writeId();
    let reverse = JSON.stringify(notes);
    fs.writeFileSync("./db/db.json", reverse, (err) => { if (err) throw err });
    console.log(notes);
    
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

function writeId() {
    notes.forEach((item, i) => {
        item.id = i+1;
    });
    console.log(notes);
}