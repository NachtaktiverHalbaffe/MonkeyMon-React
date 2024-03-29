import Pokedex from "pokedex-promise-v2";
import { Pokemon, PokemonSchema } from "@/types/pokemon";

export async function getAllPokemon(): Promise<Array<Pokemon>> {
  const P = new Pokedex();
  try {
    const pokemonListResponse = await P.getPokemonsList();
    const pokemons = await Promise.all(
      pokemonListResponse.results.map(async (element): Promise<Pokemon> => {
        const singlePokemon = await getPokemon(element.name);

        return singlePokemon;
      })
    );

    // return pokemons;
    return pokemons.sort((a, b) => a.id - b.id);
  } catch (error) {
    console.debug(error);
    return [];
  }
}

export const getPokemon = async (
  nameOrId: string | number
): Promise<Pokemon> => {
  const P = new Pokedex();
  const response = await P.getPokemonByName(nameOrId);

  const pokemon: Pokemon = {
    id: response.id,
    name: response.name,
    imageFront: response.sprites.front_default,
    imageBack: response.sprites.back_default,
    image: response.sprites.front_default,
    description: "",
    hp: response.stats.filter((stat) => stat.stat.name == "hp").pop()!
      .base_stat,
    attack: response.stats.filter((stat) => stat.stat.name == "attack").pop()!
      .base_stat,
    defense: response.stats.filter((stat) => stat.stat.name == "defense").pop()!
      .base_stat,
    specialAttack: response.stats
      .filter((stat) => stat.stat.name == "special-attack")
      .pop()!.base_stat,
    specialDefense: response.stats
      .filter((stat) => stat.stat.name == "special-defense")
      .pop()!.base_stat,
    speed: response.stats.filter((stat) => stat.stat.name == "speed").pop()!
      .base_stat,
    types: response.types.map((type) => type.type.name),
  };

  try {
    const species = await P.getPokemonSpeciesByName(response.id);
    pokemon!.name = species.names
      .filter((entry) => entry.language.name == "de")
      .pop()!.name;
    pokemon!.description = species.flavor_text_entries
      .filter((entry) => entry.language.name == "de")
      .pop()!.flavor_text;
  } catch (error) {
    console.debug(error);
  }

  return PokemonSchema.parse(pokemon);
};

export const pageSize = 10;

export const getPokemonPage = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<{
  data: Array<Pokemon>;
  currentPage: number;
  nextPage: number | null;
}> => {
  console.debug("Fetching pokeapi with page ", pageParam);
  const P = new Pokedex();

  try {
    const pokemonListResponse = await P.getPokemonsList({
      offset: pageSize * pageParam,
      limit: pageSize,
    });

    const pokemons = await Promise.all(
      pokemonListResponse.results.map(async (element): Promise<Pokemon> => {
        const singlePokemon = await getPokemon(element.name);

        return singlePokemon;
      })
    );

    return {
      data: pokemons.sort((a, b) => a.id - b.id),
      currentPage: pageParam,
      nextPage: pokemons.length < pageSize ? null : pageParam + 1,
    };
  } catch (error) {
    console.warn(error);
    return {
      data: [],
      currentPage: pageParam,
      nextPage: null,
    };
  }
};

export const getNrOfAvailbePokemon = async (): Promise<number> => {
  const P = new Pokedex();
  try {
    return (await P.getPokemonsList()).count;
  } catch (error) {
    return 0;
  }
};
