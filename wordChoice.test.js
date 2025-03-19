import { it, describe, expect } from '@jest/globals';
import wordChoice from './wordChoice';

// Test for the function 'wordChoice'.
describe("wordChoice()", () => {
    const words = ["cykla", "solen", "våg", "hund", "äpple", "tåg", "lampa", "robot"];

    // This test will ensure a random word from the array is selected.
    it("returns a random word from the list", () => {
        const word = wordChoice();
        expect(words).toContain(word);
    });

    // This test will test that a word with the specific length (5), is selected. 
    it("returns a word with the specified length", () => {
        const word = wordChoice(5);
        expect(word.length).toBe(5);
    });

    // Makes it possible to not play the game with words with duplicate letters.
    it("returns a word without duplicate letters when allowDuplicates is false", () => {
        const word = wordChoice(null, false);
        if (word) {
            const letterSet = new Set(word.split(""));
            expect(letterSet.size).toBe(word.length);
        }
    });

    // If there is no word that match the criteria, in this case a word that is longer than ten symbols, 'null' will be returned. 
    it("returns null if no words match the criteria", () => {
        const word = wordChoice(10);
        expect(word).toBeNull();
    });
});