const express = require("express");
const app = express();



app.get("/", (req, res) => {
    res.send("Home Page");
});


let port = 8080;

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});