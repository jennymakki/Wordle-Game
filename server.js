import express from "express";
import axios from "axios";
import cors from "cors"; // Import cors

const app = express();
const PORT = 5080;

// Enable CORS for all requests
app.use(cors()); // This allows your front-end (on port 3000) to make requests to the back-end (on port 5080)

let wordsList = [];

axios.get("https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json")
  .then(response => {
    wordsList = Object.keys(response.data);
    console.log("Words loaded successfully!");
  })
  .catch(error => console.error("Error loading words:", error));

// Serve random word at root
app.get("/", (req, res) => {
    if (wordsList.length === 0) {
        return res.status(500).send("Word list not loaded yet.");
    }
    const randomWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    res.send(`<h1>Random Word: ${randomWord}</h1>`);
});

// Serve random word as JSON
app.get("/random-word", (req, res) => {
    if (wordsList.length === 0) {
        return res.status(500).json({ error: "Word list not loaded yet" });
    }
    const randomWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    res.json({ word: randomWord });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app;