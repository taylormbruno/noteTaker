// Dependencies
const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

let raw = fs.readFileSync('./db/db.json');
let notes = JSON.parse(raw);
if (notes[0].id === undefined) {
    writeId();
}

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.json());

require("./routes/apiRoutes")(app, notes);
require("./routes/htmlRoutes")(app, notes);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

