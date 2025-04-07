import mongoose from "mongoose";
import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

import gameRoutes from './routes/gameRoutes.js'
import winnersRoute from "./routes/winners.js"
import Winner from "./models/Winner.js";


dotenv.config()

console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5080;  

app.use(express.json());

app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
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

if (unique === "true") {
  filteredWords = filteredWords.filter(word => {
    const letters = word.split('');
    return new Set(letters).size === letters.length;
  });
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

app.use("/api/winners", winnersRoute);

app.post('/save-winner', async (req, res) => {
  try {
    const { name } = req.body;

    const newWinner = new Winner({ name });
    await newWinner.save();
    console.log("New winner saved:", newWinner);

    res.status(200).send("Winner saved successfully!");
  } catch (err) {
    console.error("Error saving winner:", err);
    res.status(500).send("Error saving winner");
  }
});


app.get('/high-scores', async (req, res) => {
  try {
    const winners = await Winner.find().sort({ date: -1 }).limit(50); // latest 50 winners

    const html = `
       <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>High Scores</title>
          <style>
            /* Global reset */
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            /* Center the content */
            body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              padding: 2rem;
            }

            /* Frame for the content */
            .high-scores-container {
              background-color: #ffffff;
              border-radius: 15px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
              padding: 2rem;
              max-width: 600px;
              width: 100%;
              text-align: center;
            }

            /* Header styles */
            h1 {
              color: #333;
              font-size: 2rem;
              margin-bottom: 1.5rem;
            }

            /* High Scores List */
            ul {
              list-style: none;
              padding: 0;
            }

            li {
              background-color: #f9f9f9;
              margin: 0.5rem 0;
              padding: 0.8rem;
              border-radius: 8px;
              font-size: 1.1rem;
              font-weight: bold;
              color: #333;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            li:nth-child(even) {
              background-color: #f1f1f1;
            }

            /* Link styling */
            a {
              display: inline-block;
              margin-top: 2rem;
              padding: 0.8rem 1.5rem;
              background-color: #6aaa64;
              color: white;
              border-radius: 8px;
              text-decoration: none;
              font-weight: bold;
              transition: background-color 0.3s ease;
            }

            a:hover {
              background-color: #5c9b58;
            }
          </style>
        </head>
        <body>
          <div class="high-scores-container">
            <h1>🏆 High Scores</h1>
            <ul>
              ${winners.map(w => `<li><strong>${w.name}</strong> — ${new Date(w.date).toLocaleString()}</li>`).join('')}
            </ul>
            <a href="http://localhost:3000" style="display:inline-block;margin-top:1rem;">⬅️ Back to Game</a>
          </div>
        </body>
      </html>
    `;
    res.send(html);
  } catch (err) {
    console.error('Failed to fetch winners', err);
    res.status(500).send('Something went wrong');
  }
});

export default app;