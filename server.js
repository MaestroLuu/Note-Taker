const fs = require("fs");
const express = require("express");
const path = require("path");
// const api = require("./public/assets/js/index.js");
const db = require("./db/db.json");

const PORT = process.env.PORT || 3001;
const app = express();

// app.use('/api', api);
// app.use(express.json());
// app.use(express.urlencoded({
//     extended: true
// }));
app.use(express.static("public"));

app.get('/api/notes', (req, res) => 
    res.json(db)
);

app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);