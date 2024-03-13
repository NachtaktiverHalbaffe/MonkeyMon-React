import { usePokemonsOptions } from "@/hooks/use-pokemons";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/statistics")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(usePokemonsOptions),
});
