const API_URL = process.env.REACT_APP_API_URL;

export async function startGame() {
  return fetch(`${API_URL}/start-game`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
}

export async function getRandomWord(length, onlyUnique) {
    return fetch(`${process.env.REACT_APP_API_URL}/random-word?length=${length}&unique=${onlyUnique ? "true" : "false"}`);
  }

export async function saveWinner({ name, startTime, endTime, timeSpent, wordLength, onlyUniqueLetters }) {
  return fetch(`${API_URL}/save-winner`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      startTime,
      endTime,
      timeSpent,
      wordLength,
      onlyUniqueLetters,
    }),
  });
}

export async function submitScore(name, guessesCount, wordLength, onlyUniqueLetters) {
  return fetch(`${API_URL}/submit-score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      guessesCount,
      wordLength,
      onlyUniqueLetters,
    }),
  });
}