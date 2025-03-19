import { it, describe, expect } from "@jest/globals";
import feedback from "./feedback.js";

// Test for the function 'Feedback'.
describe("feedback()", () => {

  // Making sure there is a 'correct' word that the other word can be compared to. 
  it("has a correct word", () => {
    const input = feedback("");
    expect(input).toEqual("cykla");
  });

  // This test ensures that there can be an input of a guessed word.
  it("takes a guessed word", () => {
    const input = feedback("hallå");
    expect(input).toEqual(expect.any(Array));
  });

  // This test will compare the guessed word with the correct word and give information about each letter. 
  it("returns an array with objects for each letter in the guessed word and the result for the letter", () => {
    const output = feedback("hallå");
    expect(output).toEqual([
      { letter: "h", status: "incorrect" },
      { letter: "a", status: "misplaced" },
      { letter: "l", status: "incorrect" },
      { letter: "l", status: "correct" },
      { letter: "å", status: "incorrect" },
    ]);
  });
});
