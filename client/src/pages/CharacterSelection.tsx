import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCharacter } from "../context/CharacterContext";
import CharacterCard from "../components/CharacterCard";
import charactersData from "../../../server/src/seeds/userData.json";

// Character type definition
interface Character {
  id: string;
  name: string;
  image: string;
  power: number;
  defense: number;
  ability: string;
  allignment: "hero" | "villain";
}

const CharacterSelection: React.FC = () => {
  const { selectCharacters } = useCharacter();
  const [selectedHero, setSelectedHero] = useState<Character | null>(null);
  const [selectedVillain, setSelectedVillain] = useState<Character | null>(null);

  // filter characters based on type
  const heroes = charactersData.filter((char:Character) => char.allignment === "hero");
  const villains = charactersData.filter((char:Character) => char.allignment === "villain");

  // handle hero selection
  const handleHeroChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const hero = heroes.find((h:Character) => h.id === event.target.value) || null;
    setSelectedHero(hero);
  };

  // handle villain selection
  const handleVillainChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const villain = villains.find((v:Character) => v.id === event.target.value) || null;
    setSelectedVillain(villain);
  };

  // store selected characters in context
  const handleBattleReady = () => {
    if (selectedHero && selectedVillain) {
      selectCharacters(selectedHero, selectedVillain);
    }
  };

  return (
    <main className="flex flex-col items-center p-10 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Select Your Hero & Villain</h1>

      <div className="flex space-x-10 mb-8">
       
        <div className="text-center">
          <label className="block mb-2 text-lg">Choose a Hero:</label>
          <select
            className="p-2 border border-blue-500 text-black rounded-lg"
            onChange={handleHeroChange}
          >
            <option value="">Select Hero</option>
            {heroes.map((hero:Character) => (
              <option key={hero.id} value={hero.id}>
                {hero.name}
              </option>
            ))}
          </select>
        </div>

        <div className="text-center">
          <label className="block mb-2 text-lg">Choose a Villain:</label>
          <select
            className="p-2 border border-red-500 text-black rounded-lg"
            onChange={handleVillainChange}
          >
            <option value="">Select Villain</option>
            {villains.map((villain:Character) => (
              <option key={villain.id} value={villain.id}>
                {villain.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex space-x-10 mb-8">
        {selectedHero && <CharacterCard character={selectedHero} />}
        {selectedVillain && <CharacterCard character={selectedVillain} />}
      </div>

      {selectedHero && selectedVillain && (
        <Link to="/battle-arena">
          <button
            className="px-6 py-3 bg-yellow-500 text-black font-bold text-xl rounded-lg"
            onClick={handleBattleReady}
          >
            Get Ready To Battle!
          </button>
        </Link>
      )}
    </main>
  );
};

export default CharacterSelection;
