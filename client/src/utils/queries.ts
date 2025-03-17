import { gql } from '@apollo/client';


export const QUERY_ME = gql`
  query me {
    me {
      id
      username
      email
      savedCharacters {
        characterId
        name
        publisher
        description
        image
        powerstats
      }
    }
  }
`;
