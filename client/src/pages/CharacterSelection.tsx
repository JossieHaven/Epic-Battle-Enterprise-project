import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { useCharacter } from "../context/CharacterContext";
import CharacterCard from "../components/CharacterCard";
import charactersDataRaw from "../../../server/src/seeds/userData.json";

interface Character {
  id: string;
  name: string;
  image: string;
  power: number;
  defense: number;
  ability: string;
  alignment: "hero" | "villain";
}

const charactersData: Character[] = charactersDataRaw as Character[];

const CharacterSelection: React.FC = () => {
  const { selectCharacters } = useCharacter();
  const navigate = useNavigate();
  const [selectedHero, setSelectedHero] = useState<Character | null>(null);
  const [selectedVillain, setSelectedVillain] = useState<Character | null>(null);


  useEffect(() => {
    if (!selectCharacters) {
      console.warn("Character context is missing!"); // Debugging
      return;
    }
  }, []);

  const heroes = charactersData.filter((char) => char.alignment === "hero");
  const villains = charactersData.filter((char) => char.alignment === "villain");

  const handleHeroChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const hero = heroes.find((h) => h.id === event.target.value) || null;
    setSelectedHero(hero);
  };

  const handleVillainChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const villain = villains.find((v) => v.id === event.target.value) || null;
    setSelectedVillain(villain);
  };

  const handleBattleReady = () => {
    if (selectedHero && selectedVillain) {
      selectCharacters(selectedHero, selectedVillain);
      navigate("/battle", { state: { hero: selectedHero, villain: selectedVillain } });
    }
  };

  return (
    <main className="flex flex-col items-center p-10 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Select Your Hero & Villain</h1>

      <div className="flex space-x-10 mb-8">
        <div className="text-center">
          <label className="block mb-2 text-lg">Choose a Hero:</label>
          <select className="p-2 border border-blue-500 text-black rounded-lg" onChange={handleHeroChange}>
            <option value="">Select Hero</option>
            {heroes.map((hero) => (
              <option key={hero.id} value={hero.id}>
                {hero.name}
              </option>
            ))}
          </select>
        </div>

        <div className="text-center">
          <label className="block mb-2 text-lg">Choose a Villain:</label>
          <select className="p-2 border border-red-500 text-black rounded-lg" onChange={handleVillainChange}>
            <option value="">Select Villain</option>
            {villains.map((villain) => (
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
        <button
          className="px-6 py-3 bg-yellow-500 text-black font-bold text-xl rounded-lg"
          onClick={handleBattleReady}
        >
          Get Ready To Battle!
        </button>
      )}
    </main>
  );
};

export default CharacterSelection;
