import Pokedex from "pokedex-promise-v2";
import { z } from "zod";

const PokemonSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  imageFront: z.string().nullish(),
  imageBack: z.string().nullish(),
  description: z.string(),
  hp: z.number().int().gt(0).lt(500),
  attack: z.number().int().gt(0).lt(500),
  defense: z.number().int().gt(0).lt(500),
  specialAttack: z.number().int().gt(0).lt(500),
  specialDefense: z.number().int().gt(0).lt(500),
  speed: z.number().int().gt(0).lt(500),
  types: z.array(z.string()).nonempty(),
});

type Pokemon = z.infer<typeof PokemonSchema>;

export const getAllPokemon = async (): Promise<Array<Pokemon>> => {
  const P = new Pokedex();
  const pokemon: Array<Pokemon> = [];

  await P.getPokemonsList().then(async (response) => {
    await response.results.map((element) => {
      P.getPokemonByName(element.name).then(async (response) => {
        const fetchedPokemon = {
          id: response.id,
          name: response.name,
          imageFront: response.sprites.front_default,
          imageBack: response.sprites.back_default,
          description: "",
          hp: response.stats.filter((stat) => stat.stat.name == "hp").pop()!
            .base_stat,
          attack: response.stats
            .filter((stat) => stat.stat.name == "attack")
            .pop()!.base_stat,
          defense: response.stats
            .filter((stat) => stat.stat.name == "defense")
            .pop()!.base_stat,
          specialAttack: response.stats
            .filter((stat) => stat.stat.name == "special-attack")
            .pop()!.base_stat,
          specialDefense: response.stats
            .filter((stat) => stat.stat.name == "special-defense")
            .pop()!.base_stat,
          speed: response.stats
            .filter((stat) => stat.stat.name == "speed")
            .pop()!.base_stat,
          types: response.types.map((type) => type.type.name),
        };

        await P.getPokemonSpeciesByName(response.name.split("-")[0])
          .then((species) => {
            fetchedPokemon.description = species.flavor_text_entries
              .filter((entry) => entry.language.name == "de")
              .pop()!.flavor_text;
          })
          .catch(() => {});
        pokemon.push(PokemonSchema.parse(fetchedPokemon));
      });
    });
  });

  console.log(pokemon);
  return pokemon;
};
