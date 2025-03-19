import { it, describe, expect } from '@jest/globals';
import wordChoice from './wordChoice';

describe("wordChoice()", () => {
    const words = ["cykla", "solen", "våg", "hund", "äpple", "tåg", "lampa", "robot"];

    it("returns a random word from the list", () => {
        const word = wordChoice();
        expect(words).toContain(word);
    });

    it("returns a word with the specified length", () => {
        const word = wordChoice(5);
        expect(word.length).toBe(5);
    });

    it("returns a word without duplicate letters when allowDuplicates is false", () => {
        const word = wordChoice(null, false);
        if (word) {
            const letterSet = new Set(word.split(""));
            expect(letterSet.size).toBe(word.length);
        }
    });

    it("returns null if no words match the criteria", () => {
        const word = wordChoice(10);
        expect(word).toBeNull();
    });
});