import React from "react";

interface Character {
  id: string;
  name: string;
  image: string;
  power: number;
  defense: number;
  ability: string;
}

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  if (!character) return null;

  return (
    <div className="border border-gray-700 p-4 rounded-lg text-center shadow-lg bg-gray-800 text-white w-64">
      {/* Character Image */}
      <img src={character.image} alt={character.name} className="w-32 h-32 mx-auto rounded-full border-4 border-gray-500" />

      {/* Character Info */}
      <h3 className="text-xl font-bold mt-2">{character.name}</h3>
      <p className="text-sm text-gray-400">Power: <span className="font-semibold text-yellow-400">{character.power}</span></p>
      <p className="text-sm text-gray-400">Defense: <span className="font-semibold text-blue-400">{character.defense}</span></p>
      <p className="text-sm italic text-green-300 mt-2">Ability: {character.ability}</p>
    </div>
  );
};

export default CharacterCard;
