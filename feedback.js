export default function feedback(guess) {
  const correctWord = "cykla";

  // If there is no guess, correctWord (cykla) will be returned.
  if (!guess) {
    return correctWord;
  }

  const result = [];
  const correctWordLetters = correctWord.split("");
  const guessedLetters = guess.split("");

  const correctLetterCounts = {};

  // Loop to mark the correct letters.
  for (let i = 0; i < guessedLetters.length; i++) {
    if (guessedLetters[i] === correctWordLetters[i]) {
      result[i] = { letter: guessedLetters[i], status: "correct" };
      correctLetterCounts[guessedLetters[i]] =
        (correctLetterCounts[guessedLetters[i]] || 0) + 1;
    }
  }

  // Another loop to mark the misplaced or incorrect letters. 
  for (let i = 0; i < guessedLetters.length; i++) {
    if (!result[i]) {
      const letter = guessedLetters[i];
      const occurrencesInCorrectWord = correctWord.split(letter).length - 1;
      const occurrencesMarked = correctLetterCounts[letter] || 0;

      if (
        correctWord.includes(letter) &&
        occurrencesMarked < occurrencesInCorrectWord
      ) {
        result[i] = { letter, status: "misplaced" };
        correctLetterCounts[letter] = occurrencesMarked + 1;
      } else {
        result[i] = { letter, status: "incorrect" };
      }
    }
  }
  console.log("Feedback:", result);

  return result;
}
