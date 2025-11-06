const express = require("express");
const app = express();
const path = require("path");



app.set("view engine", "ejs"); // Set EJS as the template engine for rendering HTML
app.set("views", path.join(__dirname, "/views")); // Set the folder where view templates are stored
app.use(express.static(path.join(__dirname, "../Client"))); // Serve static files like CSS, JS, images from Client folder
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data from POST requests



app.get("/home", (req, res) => {
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

app.get("/messages", (req, res) => {
    res.send("Messages Page");
});

app.get("/events", (req, res) => {
    res.send("Events Page");
});

app.get("/rolldice", (req, res) => {
    let diceval = Math.floor(Math.random() * 10)+1;
    res.render("rolldice", {num: diceval});
})

// is a catch-all middleware — it handles any request that wasn’t -
// matched by your other routes.
app.use((req, res) => {
    res.status(404).send("404, Page Not Found");
});


let port = 8080;

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});