import express from "express";
const router = express.Router();
import {
  createUser,
  getSingleUser,
  saveCharacter,
  deleteCharacter,
  login,
} from "../../controllers/character-controller.js";

// import middleware
import { authenticateToken } from "../../services/auth.js";

// put authMiddleware anywhere we need to send a token for verification of user
router.route("/").post(createUser).put(authenticateToken, saveCharacter);

router.route("/login").post(login);

router.route("/me").get(authenticateToken, getSingleUser);

router
  .route("/characters/:characterId")
  .delete(authenticateToken, deleteCharacter);

export default router;
