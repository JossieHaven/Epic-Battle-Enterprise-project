export interface CharacterDetails {
    name: string;
    publisher: string;
    description: string;
    image: string;
    powerstats: {intelligence: number, strength: number, speed: number, durability: number, power: number, combat: number};
    alignment: string;
    gender: string;
    race: string
  }
  
  export interface ICharacter {
      id: string;
      stats: CharacterDetails;
  }
  