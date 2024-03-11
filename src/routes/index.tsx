import { useMonkeysOptions } from "@/hooks/use-monkeys";
import { usePokemonsOptions } from "@/hooks/use-pokemons";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  loader: async ({ context: { queryClient } }) => {
    const pokemonPromise = queryClient.ensureQueryData(usePokemonsOptions);
    const monkeysPromise = queryClient.ensureQueryData(useMonkeysOptions);

    return await Promise.all([pokemonPromise, monkeysPromise]);
  },
});
