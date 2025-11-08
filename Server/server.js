const express = require("express");
const app = express();
const path = require("path");


const { v4: uuidv4 } = require('uuid'); // Import the UUID library to generate unique IDs
const methodOverride = require("method-override"); // Import method-override to support PUT/PATCH/DELETE requests
app.set("view engine", "ejs"); // Set EJS as the template engine for rendering HTML
app.set("views", path.join(__dirname, "/views")); // Set the folder where view templates are stored
app.use(express.static(path.join(__dirname, "../Client"))); // Serve static files like CSS, JS, images from Client folder
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data from POST requests
app.use(methodOverride("_method")); // This must be **after** express.urlencoded



let posts = [
    {
        id: uuidv4(), // Assign a unique ID to each post
        username: "apnacollege",
        content: "I love coding!"
    },
    {
        id: uuidv4(),
        username: "Mofiz",
        content: "Hard work is important to achieve success"
    },
    {
        id: uuidv4(),
        username: "rahulkumar",
        content: "I got selected for my first internship!"
    },
];

app.get("/posts", (req, res) => {
    res.render("index", {posts});
});


app.get("/post/new", (req, res) => {
    res.render("new");
});


app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    posts.push({ id: uuidv4(), username, content });
    res.redirect("/posts");  
});


app.get("/posts/:id", (req, res) => {
    let { id } = req.params; 
    let post = posts.find((p) => id === p.id); 
    res.render("show", { post }); 
});


app.patch("/posts/:id", (req, res) => {
    let { id } = req.params; // Extract the post ID from the URL
    let newContent = req.body.content; // Get the new content from the form
    let post = posts.find((p) => id === p.id); // Find the post to be updated
    post.content = newContent; // Update the post's content
    res.redirect("/posts"); // Redirect back to the posts page
});


// Route to display the edit form for a specific post
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params; // Extract the post ID from the URL
    let post = posts.find((p) => id === p.id); // Find the post to edit
    res.render("edit", { post }); // Render "edit.ejs" with the post data
});



// Route to delete a post
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params; // Extract the post ID from the URL
    posts = posts.filter((p) => id !== p.id); // Remove the post with the matching ID from the posts array
    res.redirect("/posts"); // Redirect back to the posts page after deletion
});

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

app.get("/ci/:username", (req, res) => {
    let {username} = req.params;
    res.render("rolldice", {username});
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