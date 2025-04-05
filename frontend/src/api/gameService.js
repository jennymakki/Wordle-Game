import axios from 'axios';

// Function to send score to the backend
const submitScore = async (playerName, score) => {
  try {
    const response = await axios.post('http://localhost:5080/api/game/submit-score', {
      playerName,
      score,
    });
    console.log('Score submitted successfully:', response.data);
  } catch (error) {
    console.error('Error submitting score:', error);
  }
};

export { submitScore };