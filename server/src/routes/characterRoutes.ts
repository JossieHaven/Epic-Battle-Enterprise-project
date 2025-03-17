// import { Router, Request, Response } from "express";
// import Character from "../models/characterSchema";
// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

// const router = Router();
// const CHARACTER_API_KEY = process.env.CHARACTER_API_KEY;
// const API_BASE_URL = `https://superheroapi.com/api/${CHARACTER_API_KEY}`;

// // Fetch character data from external API & store in MongoDB
// router.get("/:name", async (req: Request, res: Response) => {
//     try {
//         const { name } = req.params;

//         // Check if the character exists in MongoDB
//         const existingCharacter = await Character.findOne({ name });
//         if (existingCharacter) return res.json(existingCharacter);

//         // Fetch from external API
//         const response = await axios.get(`${API_BASE_URL}/search/${name}`);
//         if (response.data.response === "error") {
//             return res.status(404).json({ error: "Character not found" });
//         }

//         // Save to MongoDB
//         const character = response.data.results[0];
//         const newCharacter = await Character.create({
//             name: character.name,
//             alignment: character.biography.alignment,
//             powerstats: character.powerstats,
//             biography: {
//                 full_name: character.biography["full-name"],
//                 publisher: character.biography.publisher,
//                 alignment: character.biography.alignment
//             },
//             image: { url: character.image.url }
//         });

//         return res.json(newCharacter);
//     } catch (error) {
//         return res.status(500).json({ error: "Failed to fetch character data" });
//     }
// });

// export default router;
