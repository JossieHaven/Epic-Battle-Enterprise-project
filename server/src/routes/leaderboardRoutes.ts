// import { Router, Request, Response } from "express";
// import Leaderboard from "../models/leaderboardModel";

// const router = Router();

// router.get("/", async (_req: Request, res: Response) => {
//     try {
//         const characters = await Leaderboard.find().sort({ power: -1 }).limit(10);
//         res.json(characters);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch leaderboard" });
//     }
// });

// router.post("/add", async (req: Request, res: Response) => {
//     try {
//         const { name, alignment, strength, speed, intelligence } = req.body;
//         const newCharacter = new Leaderboard({ name, alignment, strength, speed, intelligence });
//         await newCharacter.save();
//         res.json({ message: "Character added successfully" });
//     } catch (error) {
//         res.status(500).json({ error: "Failed to add character" });
//     }
// });

// export default router;
