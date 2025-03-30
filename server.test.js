import request from "supertest";
import app from "./server.js";


beforeAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  });


describe("GET /random-word", () => {
  test("should return a word as a JSON response", async () => {
    const response = await request(app).get("/random-word");
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("word");
    expect(typeof response.body.word).toBe("string");
  });

  test("should return a word of the requested length", async () => {
    const length = 5;
    const response = await request(app).get(`/random-word?length=${length}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("word");
    expect(response.body.word.length).toBe(length);
  });

  test("should return 404 if no words match the given length", async () => {
    const length = 100; 
    const response = await request(app).get(`/random-word?length=${length}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });

  test("should return 500 if the word list is not loaded", async () => {
    const emptyApp = await import("../server.js"); 
    emptyApp.wordsList = []; 

    const response = await request(app).get("/random-word");
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error");
  });
});