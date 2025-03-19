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
            <p>Power: {hero.power}</p>
            <p>Intelligence: {hero.intelligence}</p>
            <p>Strength: {hero.strength}</p>
            <p>Speed: {hero.speed}</p>
            <p>Durability: {hero.durability}</p>
            <p>Combat: {hero.combat}</p>
          </div>
        </div>

        {/* Battle Narration Section */}
        <div className="battle-narration">
          <h2 className="vs-text">⚡Battle Begins!⚡</h2>
          <p className="narration-text">The battle story will unfold here with OpenAI...Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>
        </div>

        {/* Villain Section */}
        <div className="character-card villain-card">
          <span className="label villain-label">Villain</span>
          <h2 className="character-name">{villain.name}</h2>
          <img src={villain.image} alt={villain.name} className="character-image" />
          <div className="stats">
            <p>Power: {villain.power}</p>
            <p>Intelligence: {villain.intelligence}</p>
            <p>Strength: {villain.strength}</p>
            <p>Speed: {villain.speed}</p>
            <p>Durability: {villain.durability}</p>
            <p>Combat: {villain.combat}</p>
          </div>
        </div>
      </div>
      {/* Button to Generate Prompt */}
      <button
        onClick={handleGeneratePrompt}
        className="mt-6 px-6 py-3 bg-yellow-500 text-black rounded-lg font-bold text-xl"
      >
        Generate AI Battle Prompt
      </button>

      {/* Display AI generated prompt */}
      {aiData && (
        <div className="mt-4 p-4 bg-white text-black rounded-lg">
          {aiData.generateBattlePrompt}
        </div>
      )}

      <button onClick={() => navigate("/search")} className="btn">
        Choose Again
      </button>
    </div>
  );
};

export default BattleArena;
