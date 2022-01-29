const fs = require("fs");
const express = require("express");
const path = require("path");
const db = require("./db/db.json");
const uniqid = require("uniqid");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
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

app.post("/api/notes", (req, res) => {
    const { title, text, id} = req.body;
    
    if( title&&text) {
        const newNote = {title, text, id: uniqid()};
        db.push(newNote);
        
        fs.writeFile(`./db/db.json`, JSON.stringify(db), (err) =>
            err ?
            console.error(err) 
            :console.log(`Review for ${newNote.title} has been written to JSON file`)
        ); 

        res.status(200).send('Post complete');
    } else {
        res.status(500).json('Error in posting notes');
    }
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);