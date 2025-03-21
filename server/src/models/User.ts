import { Schema, model, type Document } from 'mongoose';
import bcrypt from 'bcrypt';
import charactersSchema, { CharacterDocument } from './charactersSchema.js';

// import schema from Book.js


export interface UserDocument extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  savedCharacters: CharacterDocument[];
  isCorrectPassword(password: string): Promise<boolean>;
  bookCount: number;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // set savedBooks to be an array of data that adheres to the bookSchema
    savedCharacters: [charactersSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `characterCount` with the number of saved characters we have
userSchema.virtual('characterCount').get(function () {
  return this.savedCharacters.length;
});

const User = model<UserDocument>('User', userSchema);

export default User;
