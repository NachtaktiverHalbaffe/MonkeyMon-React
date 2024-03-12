import { getAllPokemon, getPokemonPage } from "@/api/pokeapi.ts";
import {
  queryOptions,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";

export function usePokemons() {
  return useQuery({
    queryKey: ["pokemons"],
    queryFn: () => getAllPokemon(),
    staleTime: Infinity,
  });
}

export function usePokemonsPagable() {
  return useInfiniteQuery({
    queryKey: ["pokemons_pagable"],
    queryFn: getPokemonPage,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: Infinity,
  });
}

export const usePokemonsOptions = queryOptions({
  queryKey: ["pokemons"],
  queryFn: () => getAllPokemon(),
  staleTime: Infinity,
});
