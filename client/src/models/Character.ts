export interface Character {
    publisher: string,
    description: string;
    characterId: string;
    image: string;
    name: string;
    alignment: string;
    powerstats: {intelligence: number, strength: number, speed: number, durability: number, power: number, combat: number}
  }
  