import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($userData: UserInput!) {
    addUser(userData: $userData) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const SAVE_CHARACTER = gql`
  mutation SaveCharacter(
    $characterId: String!
    $name: String!
    $description: String!
    $image: String
    $publisher: String
    $alignment: String
    $intelligence: String
    $strength: String
    $speed: String
    $durability: String
    $power: String
    $combat: String
  ) {
    saveCharacter(
      characterId: $characterId
      name: $name
      description: $description
      image: $image
      publisher: $publisher
      alignment: $alignment
      intelligence: $intelligence
      strength: $strength
      speed: $speed
      durability: $durability
      power: $power
      combat: $combat
    ) {
      CharacterCount
      email
      id
      username
      savedCharacters {
        publisher
        name
        characterId
        description
        image
        alignment
        intelligence
        strength
        speed
        durability
        power
        combat
      }
    }
  }
`;

export const REMOVE_CHARACTER = gql`
  mutation removeCharacter($characterId: String!) {
    removeCharacter(characterId: $characterId) {
      id
      username
      savedCharacters {
        characterId
        publisher
        name
      }
    }
  }
`;

export const GENERATE_BATTLE_PROMPT = gql`
  mutation generateBattlePrompt($hero: String!, $villain: String!) {
    generateBattlePrompt(hero: $hero, villain: $villain)
  }
`;
