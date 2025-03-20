import express from "express";
const router = express.Router();
import {
  createUser,
  getSingleUser,
  saveCharacter,
  deleteCharacter,
  login,
} from "../../controllers/character-controller.js";

// Import middleware
import { authenticateToken } from "../../services/auth.js";

// Route to create a user and save a character (requires authentication)
router.route("/").post(createUser).put(authenticateToken, saveCharacter);

// Login route
router.route("/login").post(login);

// Get user profile (authentication required)
router.route("/me").get(authenticateToken, getSingleUser);

// Delete a saved character (authentication required)
router.route("/characters/:characterId").delete(authenticateToken, deleteCharacter);

export default router;
