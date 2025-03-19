import { it, describe, expect } from "@jest/globals";
import feedback from "./feedback.js";

describe("feedback()", () => {
  it("has a correct word", () => {
    const input = feedback("");
    expect(input).toEqual("cykla");
  });

  it("takes a guessed word", () => {
    const input = feedback("hallå");
    expect(input).toEqual(expect.any(Array));
  });

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
