import Pokedex from "pokedex-promise-v2";
import { Pokemon, PokemonSchema } from "@/types/pokemon";

export async function getAllPokemon() {
  const P = new Pokedex();
  const pokemon: Array<Pokemon> = [];

  await P.getPokemonsList().then((response) => {
    response.results.map(async (element) => {
      const singlePokemon = await getPokemon(element.name);
      if (singlePokemon != undefined) {
        pokemon.push(singlePokemon);
      }
    });
  });

  return pokemon.sort((a, b) => a.id - b.id);
}

export const getPokemon = async (nameOrId: string | number) => {
  const P = new Pokedex();
  let pokemon: Pokemon | undefined;
  await P.getPokemonByName(nameOrId).then(async (response) => {
    pokemon = {
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
      defense: response.stats
        .filter((stat) => stat.stat.name == "defense")
        .pop()!.base_stat,
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

    await P.getPokemonSpeciesByName(response.id)
      .then((species) => {
        pokemon!.name = species.names
          .filter((entry) => entry.language.name == "de")
          .pop()!.name;
        pokemon!.description = species.flavor_text_entries
          .filter((entry) => entry.language.name == "de")
          .pop()!.flavor_text;
      })
      .catch(() => {});
    return PokemonSchema.parse(pokemon);
  });
  return PokemonSchema.parse(pokemon);
};
