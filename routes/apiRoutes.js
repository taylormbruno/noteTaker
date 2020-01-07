// Load Data - link to data sources
const fs = require("fs");


module.exports = function(app, notes) {

    app.get("/api/notes", function (req, res) {
        return res.json(notes);
    });

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
        console.log(req);
        notes.splice((remID - 1), 1);
        console.log(notes + " after splice \n");
    
        writeId();
        let reverse = JSON.stringify(notes);
        fs.writeFileSync("./db/db.json", reverse, (err) => { if (err) throw err });
        console.log(notes);
        
    });

    function writeId() {
        notes.forEach((item, i) => {
            item.id = i+1;
        });
        console.log(notes);
    }
}