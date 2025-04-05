import express from 'express';
import { saveGame, getHighScores } from '../controllers/gameControllers.js';

const router = express.Router();

// POST route to submit a game score
router.post('/submit-score', async (req, res) => {
  const { playerName, score } = req.body;

  if (!playerName || !score) {
    return res.status(400).json({ message: 'Player name and score are required' });
  }

  try {
    const gameData = {
      playerName,
      score,
    };

    // Save the score to MongoDB
    await saveGame(gameData);

    res.status(201).json({ message: 'Score saved successfully!' });
  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).json({ message: 'Error saving score' });
  }
});

// GET route to fetch high scores
router.get('/high-scores', async (req, res) => {
  try {
    const highScores = await getHighScores();
    res.status(200).json(highScores);
  } catch (error) {
    console.error('Error fetching high scores:', error);
    res.status(500).json({ message: 'Error fetching high scores' });
  }
});

export default router;