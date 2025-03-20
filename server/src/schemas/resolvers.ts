import { User } from "../models/index.js";
import { signToken, AuthenticationError } from "../utils/auth.js";
import OpenAI from "openai";

// Define types for the arguments
interface AddUserArgs {
  userData: {
    username: string;
    email: string;
    password: string;
  };
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface UserArgs {
  username: string;
}

interface CharacterArgs {
  characterData: {
    characterId: string;
    name: string;
    intelligence: string;
    strength: string;
    speed: string;
    durability: string;
    power: string;
    combat: string;
    publisher: string;
    desription: string;
    alignment: string;
    image: string;
  };
}

const generateAIResponse = async (inputText: string) => {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Ensure your .env file is properly loaded
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: inputText }],
    });

    return completion.choices[0].message.content; // Return the generated response
  } catch (error) {
    console.error("Error generating AI response: ", error);
    throw new Error("Failed to generate AI response");
  }
};

interface RemoveCharacterArgs {
  characterId: string;
}

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("savedCharacters");
    },
    user: async (_parent: any, { username }: UserArgs) => {
      return User.findOne({ username }).populate("savedCharacters");
    },

    // Query to get the authenticated user's information
    // The 'me' query relies on the context to check if the user is authenticated
    me: async (_parent: any, _args: any, context: any) => {
      // If the user is authenticated, find and return the user's information along with their thoughts
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate(
          "savedCharacters"
        );
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError("Could not authenticate user.");
    },

    searchCharacter: async (_: any, { name }: { name: string }) => {
      try {
        const API_KEY = process.env.SUPER_HERO_API_KEY;
        const response = await fetch(
          `https://superheroapi.com/api/${API_KEY}/search/${name}`
        );

        const data = await response.json();

        if (!data || data.response === "error") {
          throw new Error(data.error || "Character not found");
        }

        // Extract relevant character data
        return data.results.map((character: any) => ({
          characterId: character.id,
          name: character.name,
          fullName: character.biography.fullName,
          publisher: character.biography.publisher,
          alignment: character.biography.alignment,
          intelligence: character.powerstats.intelligence || "",
          strength: character.powerstats.strength || "",
          speed: character.powerstats.speed || "",
          durability: character.powerstats.durability || "",
          power: character.powerstats.power || "",
          combat: character.powerstats.combat || "",
          image: character.image.url,
        }));
      } catch (error) {
        throw new Error(`Failed to fetch character: ${error}`);
      }
    },
  },

  Mutation: {
    addUser: async (_parent: any, { userData }: AddUserArgs) => {
      // Create a new user with the provided username, email, and password
      const user = await User.create({ ...userData });
      const token = signToken(user.username, user.email, user.id);
      return { token, user };
    },

    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      // Find a user with the provided email
      const user = await User.findOne({ email });

      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError("Could not authenticate user.");
      }

      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError("Could not authenticate user.");
      }

      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);

      // Return the token and the user
      return { token, user };
    },
    //
    // Save a character for the authenticated user
    saveCharacter: async (_parent: any, args: CharacterArgs, context: any) => {
      if (!context.user) {
        throw new AuthenticationError(
          "You need to be logged in to save a character!"
        );
      }
      return await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedCharacters: args } },
        { new: true }
      );
    },

    // Remove a saved character from the authenticated user's savedCharacters
    removeCharacter: async (
      _parent: any,
      { characterId }: RemoveCharacterArgs,
      context: any
    ) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedCharacters: { characterId } } },
          { new: true }
        );
        if (!updatedUser) {
          throw new Error("Couldn't find the user or the character to remove.");
        }
        return updatedUser;
      }
      throw new AuthenticationError(
        "You need to be logged in to remove a character!"
      );
    },

    async generateBattlePrompt(_: any, { hero, villain }: any) {
      const inputText = `
      Write a two-paragraph battle story where ${hero} (Hero) and ${villain} (Villain) fight. Use their power stats to guide their attacks, defenses, and strategies:

      ${hero}'s stats: Intelligence - ${hero.intelligence}, Strength - ${hero.strength}, Speed - ${hero.speed}, Durability - ${hero.durability}, Power - ${hero.power}, Combat - ${hero.combat}.
      ${villain}'s stats: Intelligence - ${villain.intelligence}, Strength - ${villain.strength}, Speed - ${villain.speed}, Durability - ${villain.durability}, Power - ${villain.power}, Combat - ${villain.combat}.
      Describe their battle dynamically, showcasing their strengths and weaknesses. Determine the winner based on their stats and display the result at the end as follows:
      
      At the end, in one word, tell us who the winner is.
      `;
      return await generateAIResponse(inputText);
    },
  },
};

export default resolvers;
