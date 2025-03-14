import React, { useEffect, useState } from "react";
import axios from "axios";

function Leaderboard() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState("total_power");
  const [alignment, setAlignment] = useState("all");

  useEffect(() => {
    let url = `http://localhost:5000/api/leaderboard`;
    if (alignment !== "all") {
      url = `http://localhost:5000/api/leaderboard/filter/${alignment}`;
    } else {
      url = `http://localhost:5000/api/leaderboard/sort/${sortBy}`;
    }

    axios.get(url)
      .then(response => setCharacters(response.data))
      .catch(error => console.error("Error fetching leaderboard:", error));
  }, [sortBy, alignment]);

  return (
    <div>
      <h2>Leaderboard</h2>
      
      <label>Sort By: </label>
      <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="total_power">Overall Power</option>
        <option value="strength">Strength</option>
        <option value="speed">Speed</option>
        <option value="intelligence">Intelligence</option>
      </select>

      <label>Filter By: </label>
      <select onChange={(e) => setAlignment(e.target.value)}>
        <option value="all">All</option>
        <option value="hero">Heroes</option>
        <option value="villain">Villains</option>
      </select>

      <ul>
        {characters.map((char, index) => (
          <li key={index}>
            <strong>{char.name}</strong> - {sortBy}: {char[sortBy]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
