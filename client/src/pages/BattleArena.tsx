import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { GENERATE_BATTLE_PROMPT } from "../utils/mutations";
import "./BattleArena.css"; // Importing external CSS file


const BattleArena = () => {
  const navigate = useNavigate();
  const [hero, setHero] = useState<any>(null);
  const [villain, setVillain] = useState<any>(null);

  const [generatePrompt, { data: aiData, loading, error }] = useMutation(
    GENERATE_BATTLE_PROMPT
  );

  useEffect(() => {
    // Retrieve hero and villain from localStorage
    const storedHero = localStorage.getItem("hero");
    const storedVillain = localStorage.getItem("villain");

    if (storedHero) {
      setHero(JSON.parse(storedHero));
    }
    if (storedVillain) {
      setVillain(JSON.parse(storedVillain));
    }
  }, []);

  if (!hero || !villain) {
    return (
      <div className="battle-container">
        <h1 className="title">No characters selected!</h1>
        <button onClick={() => navigate("/search")} className="btn">
          Play Again
        </button>
      </div>
    );
  }

  const handleGeneratePrompt = async () => {
    if (hero && villain) {
      await generatePrompt({
        variables: { hero: hero.name, villain: villain.name },
      });
    }
  };

  if (loading) return <p>Loading AI response</p>;
  if (error) return <p>Error generating prompt: {error.message}</p>;

  // console.log(aiData.generateBattlePrompt);

  return (
    <div className="battle-container">
      <h1 className="title">⚔️ Battle Arena</h1>

      <div className="battle-cards-row">
        {/* Hero Section */}
        <div className="character-card hero-card">
          <span className="label hero-label">Hero</span>
          <h2 className="character-name">{hero.name}</h2>
          <img src={hero.image} alt={hero.name} className="character-image" />
          <div className="stats">
            <p>🔥 Power: {hero.power}</p>
            <p>🧠 Intelligence: {hero.intelligence}</p>
            <p>💪 Strength: {hero.strength}</p>
            <p>⚡ Speed: {hero.speed}</p>
            <p>🛡️ Durability: {hero.durability}</p>
            <p>⚔️ Combat: {hero.combat}</p>
          </div>
        </div>

        {/* Battle Narration Section */}
        <div className="battle-narration">
          <h2 className="vs-text">⚡Battle Begins!⚡</h2>
          <p className="narration-text"> 
          {aiData && (
        <div className="mt-4 p-4 bg-white text-black rounded-lg">
          {aiData.generateBattlePrompt}
        </div>
      )}
          </p>
        </div>

        {/* Villain Section */}
        <div className="character-card villain-card">
          <span className="label villain-label">Villain</span>
          <h2 className="character-name">{villain.name}</h2>
          <img src={villain.image} alt={villain.name} className="character-image" />
          <div className="stats">
            <p>🔥 Power: {villain.power}</p>
            <p>🧠 Intelligence: {villain.intelligence}</p>
            <p>💪 Strength: {villain.strength}</p>
            <p>⚡ Speed: {villain.speed}</p>
            <p>🛡️ Durability: {villain.durability}</p>
            <p>⚔️ Combat: {villain.combat}</p>
          </div>
        </div>
      </div>
      {/* Button to Generate Prompt */}
      <button onClick={handleGeneratePrompt} className="generate-battle-btn">
  Generate AI Battle Prompt
</button>

      {/* Display AI generated prompt */}
      

      <button onClick={() => navigate("/search")} className="btn">
        Play Again
      </button>
    </div>
  );
};

export default BattleArena;
