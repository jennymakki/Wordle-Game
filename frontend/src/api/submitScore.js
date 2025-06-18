import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5080";

const submitScore = async (playerName, score) => {
  try {
    const response = await axios.post(`${API_URL}/api/game/submit-score`, {
      playerName,
      score,
    });
    console.log('Score submitted successfully:', response.data);
  } catch (error) {
    console.error('Error submitting score:', error);
  }
};

export { submitScore };