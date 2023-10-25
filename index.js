const Database = require("better-sqlite3");
const db = new Database("mood.db");

db.exec(`CREATE TABLE IF NOT EXISTS statuses (
    timestamp INTEGER NOT NULL,
    mood TEXT NOT NULL,
    addr TEXT NOT NULL
)`);
const insert = db.prepare("INSERT INTO statuses (timestamp, mood, addr) VALUES (?, ?, ?)");

const express = require("express");
const app = express();
app.set("trust proxy", true);

app.use(express.static("public"));
app.post("/report", (req, res) => {
    insert.run(Date.now(), req.query.emotion, req.ip);
    res.sendStatus(200);
});

app.listen(80, () => console.log("Listening"));