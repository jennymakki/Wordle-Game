import React from 'react';
import '../styles/Grid.css';

const Grid = ({ guesses, wordLength, randomWord }) => {
  const checkGuess = (guess) => {
    const result = [];
    const correctWordLetters = randomWord.split("");
    const guessedLetters = guess.split("");

    const correctLetterCounts = {};

    for (let i = 0; i < guessedLetters.length; i++) {
      if (guessedLetters[i] === correctWordLetters[i]) {
        result[i] = "correct";
        correctLetterCounts[guessedLetters[i]] = (correctLetterCounts[guessedLetters[i]] || 0) + 1;
      }
    }

    for (let i = 0; i < guessedLetters.length; i++) {
      if (!result[i]) {
        const letter = guessedLetters[i];
        const occurrencesInCorrectWord = correctWordLetters.filter(l => l === letter).length;
        const occurrencesMarked = correctLetterCounts[letter] || 0;

        if (correctWordLetters.includes(letter) && occurrencesMarked < occurrencesInCorrectWord) {
          result[i] = "misplaced";
          correctLetterCounts[letter] = occurrencesMarked + 1;
        } else {
          result[i] = "incorrect";
        }
      }
    }

    return result;
  };

  return (
    <div className="grid">
      {Array.from({ length: 6 }).map((_, rowIndex) => {
        const guess = guesses[rowIndex] || ""; 
        const statuses = guess ? checkGuess(guess) : [];

        return (
          <div key={rowIndex} className="grid-row">
            {Array.from({ length: wordLength }).map((_, colIndex) => {
              const letter = guess[colIndex] || "";
              const status = statuses[colIndex] || ""; 

              return (
                <div key={colIndex} className={`grid-cell ${status}`}>
                  {letter}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;