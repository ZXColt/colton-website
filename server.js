const express = require("express");
const app = express();
const port = 3001;

// Serve static files from 'public' directory
app.use(express.static("public"));

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to My Personal Site!");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});