import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
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

  mutation SaveCharacter($characterId: String!, $name: String!, $description: String!, $image: String, $powerstats: PowerstatsInput) {
  saveCharacter(characterId: $characterId, name: $name, description: $description, image: $image, powerstats: PowerstatsInput) {
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
    }
    powerstats {
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