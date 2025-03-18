export const searchSuperheroAPI = (query: string) => {

    return fetch(
      `https://superheroapi.com/api/${import.meta.env.VITE_SUPER_HERO_API_KEY}/search/${query}`
    );
  };
  