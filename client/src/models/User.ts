import type { Character } from './Character';

export interface User {
  username: string | null;
  email: string | null;
  password: string | null;
  savedCharacters: Character[];
}
