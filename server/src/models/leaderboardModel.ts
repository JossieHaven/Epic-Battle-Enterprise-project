// import mongoose from "mongoose";

// interface ILeaderboard {
//     name: string;
//     alignment: "hero" | "villain";
//     strength: number;
//     speed: number;
//     intelligence: number;
//     power: number;
//     favorites: number;
// }

// const LeaderboardSchema = new mongoose.Schema<ILeaderboard>({
//     name: { type: String, required: true },
//     alignment: { type: String, enum: ["hero", "villain"], required: true },
//     strength: { type: Number, required: true },
//     speed: { type: Number, required: true },
//     intelligence: { type: Number, required: true },
//     power: { type: Number, default: function() { return this.strength + this.speed + this.intelligence; } },
//     favorites: { type: Number, default: 0 }
// });

// const Leaderboard = mongoose.model<ILeaderboard>("Leaderboard", LeaderboardSchema);

// export default Leaderboard;
