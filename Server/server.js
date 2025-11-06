const express = require("express");
const app = express();
const path = require("path");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "../Client")));
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("home");
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../Client/index.html"));
});


app.post("/resgister", (req, res) => {
    let {user, password} = (req.body);
    console.log(`User : ${user}`);
    console.log(`password : ${password}`);
    res.send(`Welcome ${user}`);
});


app.get("/login", (req, res) => {
    res.send("Login Page");
});

app.get("/profile", (req, res) => {
    res.send("Profile Page");
});

app.get("/connections", (req, res) => {
    res.send("Connections Page");
});

// is a catch-all middleware — it handles any request that wasn’t -
// matched by your other routes.
app.use((req, res) => {
    res.status(404).send("404, Page Not Found");
});


let port = 8080;

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});