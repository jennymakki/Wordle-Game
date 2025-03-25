/* import request from "supertest";
import app from "./server";

beforeAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Delay for 3 seconds
});

describe("API Tests", () => {
    
    test("GET / should return a random word", async () => {
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
        expect(response.text).toMatch(/Random Word: \w+/);
    });

    test("GET /random-word should return a JSON with a word", async () => {
        const response = await request(app).get("/random-word");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("word");
        expect(typeof response.body.word).toBe("string");
    });

}); */