export interface Character {
  id: number;
  name: string;
  gender: string;
  img: string;
}

export interface CharacterApiResponse {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: Character[]; 
  }
  
export interface Episode {
  id: number;           
  img: string;
  name: string;         
  number: string;      
  season: number;       
  air_date: string;     
}

export interface EpisodeApiInfo {
  count: number;    
  pages: number;   
  next: string | null;
  prev: string | null;
}

export interface TitanApiInfo {
  count: number;    
  pages: number;       
  next: string | null; 
  prev: string | null; 
}

export interface Titan {
  id: number;          
  name: string;         
  height: string;       
  current_inheritor: string | null;
  allegiance: string;  
  abilities: string[];  
  img: string | null; 
  url: string;        
}

export interface ApiResponse {
  characters: Character[]; 
}

export interface EpisodeApiResponse {
  info: EpisodeApiInfo; 
  results: Episode[];   
}

export interface TitanApiResponse {
  info: TitanApiInfo;  
  results: Titan[];    
}