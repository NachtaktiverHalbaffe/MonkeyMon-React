import { useQuery } from "@tanstack/react-query";
import { getAllPokemon } from "@/api/pokeapi";

export function usePokemons() {
  return useQuery({
    queryKey: ["pokemons"],
    queryFn: () => getAllPokemon(),
    staleTime: Infinity,
  });
}
