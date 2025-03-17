import SUPER_HERO_API_KEY from 'dotenv';


export const searchSuperheroAPI = (query: string) => {
    return fetch(`https://superheroapi.com/api/${SUPER_HERO_API_KEY}/search/${query}`);
  };
  