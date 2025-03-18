// Removed unused imports
import express from "express";
import User  from "../models/User"; // Adjusted the path to match the correct location
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: { type: [String], default: [] },
    battles: { type: [Object], default: [] },
});

// Add a method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Hash the password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


const router = express.Router();

// Register a new user
const registerUser = async (req: express.Request, res: express.Response): Promise<express.Response | void> => {
    const { username, email, password } = req.body as { username: string; email: string; password: string };

    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ error: "User already exists" });

        const newUser = new User({ username, email, password });
        await newUser.save();

        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
};

export { registerUser };

// Login user
router.post("/login", async (req: express.Request, res: express.Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ error: "Invalid email or password" });
            return;
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            res.status(400).json({ error: "Invalid email or password" });
            return;
        }

        res.json({ id: user._id, username: user.username, email: user.email });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Get user profile


// Update user profile
router.get(
    "/:id",
    async (req: express.Request<{ id: string }>, res: express.Response): Promise<void> => {
        try {
            const user = await User.findById(req.params.id).select("-password");
            if (!user) {
                res.status(404).json({ error: "User not found" });
                return;
            }

            res.json(user);
        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    }
);

// Add a favorite character
// Removed duplicate route definition for "/:id"
// Get user battle history
router.get("/:id/battles", async (req: express.Request<{ id: string }>, res: express.Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.json(user.battles);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
