import gql from 'graphql-tag';

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
    powerstats: PowerStats
    publisher: String!
    allignment: String!
    gender: String!
    race: String
    description: String!
    image: String
  }

  type PowerStats {
    intelligence: Int!,
    strength: Int!,
    speed: Int!,
    durability: Int!,
    power: Int!,
    combat: Int!
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
  intelligence: Int!,
    strength: Int!,
    speed: Int!,
    durability: Int!,
    power: Int!,
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
  }

  type Mutation {
    addUser(userData: UserInput!): Auth
    login(email: String!, password: String!): Auth
    saveCharacter(characterId: String!, name: String!, powerstats: PowerstatsInput!, description: String!, image: String): User
    removeCharacter(characterId: String!): User
  }
`;

export default typeDefs;
