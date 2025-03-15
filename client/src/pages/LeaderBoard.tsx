import { useEffect, useState } from "react";
import { fetchLeaderboard } from "../services/api.tsx";
import "../styles/Leaderboard.css";

interface Character {
  id: number;
  name: string;
  alignment: "hero" | "villain";
  strength: number;
  speed: number;
  intelligence: number;
  total_power: number;
}

function Leaderboard() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [sortBy, setSortBy] = useState<string>("total_power");
  const [alignment, setAlignment] = useState<string>("all");

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const data = await fetchLeaderboard(sortBy, alignment);
        setCharacters(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    loadLeaderboard();
  }, [sortBy, alignment]);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>

      {/* Sorting Dropdown */}
      <label>Sort By:</label>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="total_power">Overall Power</option>
        <option value="strength">Strength</option>
        <option value="speed">Speed</option>
        <option value="intelligence">Intelligence</option>
      </select>

      {/* Alignment Filter Dropdown */}
      <label>Filter By:</label>
      <select value={alignment} onChange={(e) => setAlignment(e.target.value)}>
        <option value="all">All</option>
        <option value="hero">Heroes</option>
        <option value="villain">Villains</option>
      </select>

      {/* Leaderboard Table */}
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Alignment</th>
            <th>Strength</th>
            <th>Speed</th>
            <th>Intelligence</th>
            <th>Total Power</th>
          </tr>
        </thead>
        <tbody>
          {characters.length > 0 ? (
            characters.map((char, index) => (
              <tr key={char.id}>
                <td>{index + 1}</td>
                <td>{char.name}</td>
                <td>{char.alignment}</td>
                <td>{char.strength}</td>
                <td>{char.speed}</td>
                <td>{char.intelligence}</td>
                <td>{char.total_power}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
