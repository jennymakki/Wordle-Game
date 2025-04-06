import express from "express";
import Winner from "../models/Winner.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    const winner = new Winner({ name });
    await winner.save();
    res.status(201).json({ message: "Winner saved!" });
  } catch (err) {
    console.error("Error saving winner:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;