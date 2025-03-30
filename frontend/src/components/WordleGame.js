import { useState } from "react";

function WordleGame({ randomWord }) {
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState([]);
  const [message, setMessage] = useState("");

  const checkGuess = (guess) => {
    const result = [];
    const correctWordLetters = randomWord.split("");
    const guessedLetters = guess.split("");

    const correctLetterCounts = {};

    // Mark correctly placed letters
    for (let i = 0; i < guessedLetters.length; i++) {
      if (guessedLetters[i] === correctWordLetters[i]) {
        result[i] = { letter: guessedLetters[i], status: "correct" };
        correctLetterCounts[guessedLetters[i]] =
          (correctLetterCounts[guessedLetters[i]] || 0) + 1;
      }
    }

    // Mark misplaced and incorrect letters
    for (let i = 0; i < guessedLetters.length; i++) {
      if (!result[i]) {
        const letter = guessedLetters[i];
        const occurrencesInCorrectWord = randomWord.split(letter).length - 1;
        const occurrencesMarked = correctLetterCounts[letter] || 0;

        if (
          randomWord.includes(letter) &&
          occurrencesMarked < occurrencesInCorrectWord
        ) {
          result[i] = { letter, status: "misplaced" };
          correctLetterCounts[letter] = occurrencesMarked + 1;
        } else {
          result[i] = { letter, status: "incorrect" };
        }
      }
    }

    return result;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (guess.length !== randomWord.length) {
      setMessage(`Word must be ${randomWord.length} letters long.`);
      return;
    }

    const result = checkGuess(guess);
    setAttempts([...attempts, { guess, result }]);
    setGuess("");

    if (guess === randomWord) {
      setMessage("🎉 Congratulations! You guessed the word!");
    } else if (attempts.length >= 5) {
      setMessage(`😢 Game Over! The word was "${randomWord}".`);
    }
  };

  return (
    <div className="wordle-game">
      <h2>Guess the Word</h2>
      {message && <p>{message}</p>}

      {attempts.map((attempt, index) => (
        <div key={index}>
          {attempt.result.map(({ letter, status }, i) => (
            <span key={i} className={`letter ${status}`}>
              {letter}
            </span>
          ))}
        </div>
      ))}

      {attempts.length < 6 && !message.includes("Congratulations") && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            maxLength={randomWord.length}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default WordleGame;