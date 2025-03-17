import { User } from "../models/index.js";
import { signToken, AuthenticationError } from "../utils/auth.js";

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
    powerstats: {
      intelligence: number;
      strength: number;
      speed: number;
      durability: number;
      power: number;
      combat: number;
    };
    publisher: string;
    desription: string;
    allignment: string;
    gender: string;
    race: string;
    image: string;
  };
}

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
  },
  Mutation: {
    addUser: async (_parent: any, { userData }: AddUserArgs) => {
      // Create a new user with the provided username, email, and password
      const user = await User.create({ userData });
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
  },
};

export default resolvers;
