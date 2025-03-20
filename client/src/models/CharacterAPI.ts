export interface CharacterDetails {
    name: string;
    publisher: string;
    description: string;
    image: string;
    intelligence: string; 
    strength: string;
    speed: string;
    durability: string;
    power: string;
    ombat: string;
    alignment: string;
  }
  
  export interface ICharacter {
      id: string;
      stats: CharacterDetails;
  }
  
