import { getAllPokemon } from "@/api/pokeapi.ts";
import { useQuery } from "@tanstack/react-query";

export function usePokemons() {
  return useQuery({
    queryKey: ["pokemons"],
    queryFn: () => getAllPokemon(),
    staleTime: Infinity,
  });
}
