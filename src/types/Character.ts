export interface Character {
  id: number;
  name: string;
  age: number | null; 
  gender: string;
  status: string;
  abilities: string[];
  img: string;
}

export interface ApiResponse {
  characters: Character[];
}