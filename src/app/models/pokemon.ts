export interface PokemonListItem {
  name: string;
  url: string;
  id: number;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
    other: { 'official-artwork': { front_default: string } };
  };
  types:     { type: { name: string } }[];
  stats:     { base_stat: number; stat: { name: string } }[];
  abilities: { ability: { name: string } }[];
}

export interface Generation {
  label: string;
  gen: string;
  start: number;
  end: number;
}