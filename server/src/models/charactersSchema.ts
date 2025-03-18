import { Schema, type Document } from "mongoose";

export interface CharacterDocument extends Document {
  characterId: string;
  name: string;
  powerstats: {
    intelligence: string;
    strength: string;
    speed: string;
    durability: string;
    power: string;
    combat: string;
  };
  biography: { 
    publisher: string; 
    alignment: string;
    fullName: string
  };
  image: {
    url: string;
  }
}

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const charactersSchema = new Schema<CharacterDocument>({
  name: {
    type: String,
    required: true,
  },
  // saved character id from heroAPI
  characterId: {
    type: String,
    required: true,
  },
  image: {
    url: { type: String, required: true },
  },
  powerstats: {
    intelligence: { type: String, required: true },
    strength: { type: String, required: true },
    speed: { type: String, required: true },
    durability: { type: String, required: true },
    power: { type: String, required: true },
    combat: { type: String, required: true },
  },
  biography: {
    publisher: { type: String, required: true },
    alignment: { type: String, required: true },
    fullName: { type: String, required: true },
  },

  
});

export default charactersSchema;
