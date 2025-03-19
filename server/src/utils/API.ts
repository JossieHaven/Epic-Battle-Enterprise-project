export const searchSuperheroAPI = (query: string) => {
  return fetch(
    `https://superheroapi.com/api/${process.env.SUPER_HERO_API_KEY}/search/${query}`
  );
};
