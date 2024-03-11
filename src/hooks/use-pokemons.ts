import { getAllPokemon } from "@/api/pokeapi.ts";
import { queryOptions, useQuery } from "@tanstack/react-query";

export function usePokemons() {
  return useQuery({
    queryKey: ["pokemons"],
    queryFn: () => getAllPokemon(),
    staleTime: Infinity,
  });
}

export const usePokemonsOptions = queryOptions({
  queryKey: ["pokemons"],
  queryFn: () => getAllPokemon(),
  staleTime: Infinity,
});
