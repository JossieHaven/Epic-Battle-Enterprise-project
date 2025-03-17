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
  publisher: string;
  allignment: string;
  gender: string;
  race: string;
  image: string;
}

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const charactersSchema = new Schema<CharacterDocument>({
  
  name: {
    type: String,
    required: true,
  },
  // saved book id from GoogleBooks
  characterId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  powerstats: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  allignment: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  race: {
    type: String,
    required: true,
  },
});

export default charactersSchema;
