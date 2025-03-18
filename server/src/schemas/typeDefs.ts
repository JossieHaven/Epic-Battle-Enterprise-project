import gql from "graphql-tag";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String
    savedCharacters: [Character]
    characterCount: Int
  }

  type Character {
    characterId: String!
    name: String!
    fullName: String
    publisher: String
    alignment: String
    intelligence: String
    strength: String
    speed: String
    durability: String
    power: String
    combat: String
    image: String
    
  }


  input CharacterInput {
    characterId: String!
    name: String!
    powerstats: PowerstatsInput
    description: String!
    image: String
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  input PowerstatsInput {
    intelligence: Int!
    strength: Int!
    speed: Int!
    durability: Int!
    power: Int!
    combat: Int!
  }
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    searchCharacter(name: String!): [Character]
  }

  type Mutation {
    addUser(userData: UserInput!): Auth
    login(email: String!, password: String!): Auth
    saveCharacter(
      id: ID!
      name: String!
      publisher: String
      alignment: String
      image: String
      powerstats: PowerstatsInput
    ): Character
    removeCharacter(characterId: String!): User
  }
`;

export default typeDefs;
