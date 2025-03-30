import React from 'react';
import '../styles/Grid.css';

const Grid = ({ guesses, currentGuess, wordLength }) => {
  // Ensure guesses is an array and currentGuess is a string
  const rows = [...guesses, currentGuess || ""]; // Add currentGuess as an empty string if it's undefined or null

  return (
    <div className="grid">
      {Array.from({ length: 6 }).map((_, rowIndex) => {
        const guess = rows[rowIndex] || ''; // Ensure there's always a string to work with
        return (
          <div key={rowIndex} className="grid-row">
            {Array.from({ length: wordLength }).map((_, colIndex) => (
              <div
                key={colIndex}
                className={`grid-cell ${
                  guess[colIndex] ? guess[colIndex].toLowerCase() : ""
                }`}
              >
                {guess[colIndex] || ""}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;