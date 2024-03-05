import { createFileRoute, defer } from "@tanstack/react-router";
import { RoundedDiv } from "@/components/ui/rounded-div";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { queryOptions } from "@tanstack/react-query";
import { getAllPokemon } from "@/api/pokeapi";
import { PokemonCard } from "@/components/pokemon-card";
import React from "react";
import Autoplay from "embla-carousel-autoplay";

const pokeApiQueryOptions = queryOptions({
  queryKey: ["pokemons"],
  queryFn: () => getAllPokemon(),
});

export const Route = createFileRoute("/pokedex")({
  loader: ({ context: { queryClient } }) =>
    defer(queryClient.ensureQueryData(pokeApiQueryOptions)),
  component: Pokedex,
  pendingComponent: () => <LoadingSpinner />,
});

function Pokedex() {
  const pokemons = Route.useLoaderData();
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <RoundedDiv className="bg-neutral-100 p-1 dark:bg-neutral-800">
      <Carousel className="w-full max-w-2xl" plugins={[plugin.current]}>
        <CarouselContent>
          {pokemons?.map((pokemon, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <PokemonCard pokemon={pokemon} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </RoundedDiv>
  );
}
