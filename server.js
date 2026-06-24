const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "agri_allied"
});

db.connect((err) => {
    if (err) {
        console.log("Database Connection Error:", err);
        return;
    }
    console.log("MySQL Connected");
});

// Home Route
app.get("/", (req, res) => {
    res.send("Agri-Allied Server Running");
});

// Login Route
app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql =
        "SELECT * FROM users WHERE email = ? AND password = ?";

    db.query(sql, [email, password], (err, result) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        if (result.length > 0) {
            res.redirect("/dashboard.html");
        } else {
            res.send("Invalid Email or Password");
        }

    });

});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});