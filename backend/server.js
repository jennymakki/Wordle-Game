import mongoose from "mongoose";
import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

import gameRoutes from "./routes/gameRoutes.js";
import winnersRoute from "./routes/winners.js";
import Winner from "./models/Winner.js";

dotenv.config();

console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5080;

app.use(express.json());

app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
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

axios
  .get(
    "https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json"
  )
  .then((response) => {
    wordsList = Object.keys(response.data);
    console.log("First 10 words in list:", wordsList.slice(0, 10));
    console.log("Words loaded successfully!");
  })
  .catch((error) => console.error("Error loading words:", error));

app.get("/", (req, res) => {
  res.send("<h1>Wordle Backend is Running</h1>");
});

app.get("/random-word", (req, res) => {
  if (wordsList.length === 0) {
    return res.status(500).json({ error: "Word list not loaded yet" });
  }

  const { length, unique } = req.query;
  let filteredWords = wordsList;

  if (length) {
    const wordLength = parseInt(length, 10);
    filteredWords = wordsList.filter((word) => word.length === wordLength);
    console.log(`Filtered words with length ${wordLength}:`, filteredWords);
  }

  if (unique === "true") {
    filteredWords = filteredWords.filter((word) => {
      const letters = word.split("");
      return new Set(letters).size === letters.length;
    });
  }

  if (filteredWords.length === 0) {
    return res
      .status(404)
      .json({ error: `No words found with length ${length}` });
  }

  const randomWord =
    filteredWords[Math.floor(Math.random() * filteredWords.length)];
  console.log("Random word selected:", randomWord);
  res.json({ word: randomWord });
});

app.use("/api/game", gameRoutes);

app.use("/api/winners", winnersRoute);

app.post("/start-game", (req, res) => {
  const startTime = new Date().toISOString();
  res.json({ startTime });
});

app.post("/save-winner", async (req, res) => {
  try {
    const { name, startTime } = req.body;
    const endTime = new Date().toISOString();

    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    const timeSpent = (endDate - startDate) / 1000;

    const newWinner = new Winner({
      name,
      startTime,
      endTime,
      timeSpent,
    });

    await newWinner.save();
    console.log("New winner saved:", newWinner);

    res.status(200).send("Winner saved successfully!");
  } catch (err) {
    console.error("Error saving winner:", err);
    res.status(500).send("Error saving winner");
  }
});

app.get("/high-scores", async (req, res) => {
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
              background: linear-gradient(to right, #dcdcdc, #b0b0b0);
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
              padding: 4rem;
              max-width: 600px;
              width: 100%;
              text-align: center;
              margin-top: 1.5rem;
            }

            /* Header styles */
            h1 {
              color: #333;
              font-size: 1.1rem;
              margin-bottom: 1rem;
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
              margin-top: 0rem;
              padding: 0.8rem 1.5rem;
              background-color: #6aaa64;
              color: white;
              border-radius: 8px;
              text-decoration: none;
              transition: background-color 0.3s ease;
            }

            a:hover {
              background-color: #5c9b58;
            }

  body {
  display: flex;
  flex-direction: column;
  margin: 0;
}

              .header__div {
  width: 100%;
  padding: 1rem 0;
  top: 0;
  left: 0;
}

              .header {
  top: 0;
  left: 0;
  width: 100%;
  background-color: #202124;
  padding: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  z-index: 1000;
  flex-wrap: wrap;
  box-sizing: border-box;
  margin-top: 0;
}

.header__item {
  font-size: 1.1rem;
  color: #fff;
  background-color: #3a3a3c;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  flex-shrink: 0;
}
  
  .header__item:hover {
    background-color: #538d4e;
    cursor: pointer;
  }
            }
          </style>
        </head>
<body>
<div class="header__div">
  <nav class="header">
    <a class="header__item" href="http://localhost:3000" data-discover="true">Wordle Game</a>
    <a class="header__item" href="http://localhost:5080/high-scores" rel="noopener noreferrer">High Scores</a>
    <a class="header__item" href="http://localhost:3000/about" data-discover="true">About</a>
  </nav>
</div>
<div class="high-scores-container">
    <h1>🏆 High Scores</h1>
        <ul>
      ${winners
        .map(
          (w) =>
            `<li><strong>${w.name}</strong> — ${new Date(
              w.date
            ).toLocaleString()} — Time: ${
              w.timeSpent ? w.timeSpent.toFixed(2) : "N/A"
            } seconds</li>`
        )
        .join("")}
    </ul>
  </div>
</body>
      </html>
    `;
    res.send(html);
  } catch (err) {
    console.error("Failed to fetch winners", err);
    res.status(500).send("Something went wrong");
  }
});

export default app;
