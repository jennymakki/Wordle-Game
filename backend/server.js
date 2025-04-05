import mongoose from "mongoose";
import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import gameRoutes from './routes/gameRoutes.js'

dotenv.config()

console.log(process.env.MONGO_URI);

const app = express();
const PORT = 5080;

app.use(express.json());

app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

let wordsList = [];

axios.get("https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json")
  .then(response => {
    wordsList = Object.keys(response.data);
    console.log("First 10 words in list:", wordsList.slice(0, 10));
    console.log("Words loaded successfully!");
  })
  .catch(error => console.error("Error loading words:", error));

// Root endpoint (just for testing in the browser)
app.get("/", (req, res) => {
  res.send("<h1>Wordle Backend is Running</h1>");
});

// Get a random word with optional length filter
app.get("/random-word", (req, res) => {
  if (wordsList.length === 0) {
    return res.status(500).json({ error: "Word list not loaded yet" });
  }

  // Get word length from query parameters
  const { length } = req.query;
  let filteredWords = wordsList;

  // If a length is provided, filter words by length
  if (length) {
    const wordLength = parseInt(length, 10);
    filteredWords = wordsList.filter(word => word.length === wordLength);
    console.log(`Filtered words with length ${wordLength}:`, filteredWords);
}

  // If no words of that length exist, return an error
  if (filteredWords.length === 0) {
    return res.status(404).json({ error: `No words found with length ${length}` });
  }

  // Pick a random word from the filtered list
  const randomWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
  console.log("Random word selected:", randomWord);
  res.json({ word: randomWord });
});

app.use('/api/game', gameRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;