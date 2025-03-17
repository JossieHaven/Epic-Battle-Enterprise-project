import React, { createContext, useContext, useState, ReactNode } from "react";

// structure of a Character
interface Character {
  id: string;
  name: string;
  image: string;
  power: number;
  defense: number;
  ability: string;
}

interface CharacterContextType {
  selectedHero: Character | null;
  selectedVillain: Character | null;
  selectCharacters: (hero: Character, villain: Character) => void;
}
const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const CharacterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedHero, setSelectedHero] = useState<Character | null>(null);
  const [selectedVillain, setSelectedVillain] = useState<Character | null>(null);

  const selectCharacters = (hero: Character, villain: Character) => {
    setSelectedHero(hero);
    setSelectedVillain(villain);
  };

  return (
    <CharacterContext.Provider value={{ selectedHero, selectedVillain, selectCharacters }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = (): CharacterContextType => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error("useCharacter must be used within a CharacterProvider");
  }
  return context;
};
