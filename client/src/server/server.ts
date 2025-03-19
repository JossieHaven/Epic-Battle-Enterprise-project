import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../config/database";
import userRoutes from "../routes/userRoutes";

const router = express.Router();

// Example route
router.get("/", (_req, res) => {
  res.send("User route is working!");
});

export default router;
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
