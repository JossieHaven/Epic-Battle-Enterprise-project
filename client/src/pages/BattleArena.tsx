import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SEARCH_CHARACTER_BY_ID } from "../utils/queries";
import { useLazyQuery } from "@apollo/client/react/hooks/useLazyQuery";


const BattleArena = () => {
  const navigate = useNavigate();
  const [hero, setHero] = useState<any>(null);
  const [villain, setVillain] = useState<any>(null);
    const [searchCharacterById, { loading, error, data }] = useLazyQuery(SEARCH_CHARACTER_BY_ID);
  

  useEffect(() => {
    // Retrieve hero and villain from localStorage
    const storedHero = localStorage.getItem("hero");
    const storedVillain = localStorage.getItem("villain");

    if (storedHero && storedVillain) {
      setHero(JSON.parse(storedHero));
      setVillain(JSON.parse(storedVillain));
    }
  }, []);

  if (!hero || !villain) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-4">No characters selected!</h1>
        <button
          onClick={() => navigate("/search")}
          className="px-6 py-3 bg-yellow-500 text-black rounded-lg font-bold text-xl"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">⚔️ Battle Arena</h1>

      <div className="flex justify-center space-x-10 mt-8">
        {/* Hero Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold">{hero.name}</h2>
          <img
            src={hero.image}
            alt={hero.name}
            className="w-40 h-40 object-cover rounded-lg border border-blue-500"
          />
          <p className="mt-2">Power: {hero.power}</p>
          <p>Intelligence: {hero.intelligence}</p>
          <p>Strength: {hero.strength}</p>
          <p>Speed: {hero.speed}</p>
          <p>Durability: {hero.durability}</p>
          <p>Combat: {hero.combat}</p>
        </div>

        {/* VS Section */}
        <h1 className="text-5xl font-bold">VS</h1>

        {/* Villain Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold">{villain.name}</h2>
          <img
            src={villain.image}
            alt={villain.name}
            className="w-40 h-40 object-cover rounded-lg border border-red-500"
          />
          <p className="mt-2">Power: {villain.power}</p>
          <p>Intelligence: {villain.intelligence}</p>
          <p>Strength: {villain.strength}</p>
          <p>Speed: {villain.speed}</p>
          <p>Durability: {villain.durability}</p>
          <p>Combat: {villain.combat}</p>
        </div>
      </div>

      <button
        onClick={() => navigate("/search")}
        className="mt-6 px-6 py-3 bg-yellow-500 text-black rounded-lg font-bold text-xl"
      >
        Choose Again
      </button>
    </div>
  );
};

export default BattleArena;
