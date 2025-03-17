import { useState } from "react";
import axios from "axios";

function CharacterStats() {
    const [name, setName] = useState("");
    const [character, setCharacter] = useState<any>(null);
    const [error, setError] = useState("");

    const fetchCharacter = async () => {
        try {
            setError("");
            const response = await axios.get(`http://localhost:5000/api/characters/${name}`);
            setCharacter(response.data);
        } catch (err) {
            setError("Character not found");
            setCharacter(null);
        }
    };

    return (
        <div>
            <h2>Find a Character</h2>
            <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={fetchCharacter}>Search</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {character && (
                <div>
                    <h3>{character.name}</h3>
                    <img src={character.image.url} alt={character.name} width="200px" />
                    <p>Strength: {character.powerstats.strength}</p>
                    <p>Speed: {character.powerstats.speed}</p>
                    <p>Intelligence: {character.powerstats.intelligence}</p>
                </div>
            )}
        </div>
    );
}

export default CharacterStats;
