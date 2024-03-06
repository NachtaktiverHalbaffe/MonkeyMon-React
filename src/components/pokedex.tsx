import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useQuery } from "@tanstack/react-query";
import { getAllPokemon } from "@/api/pokeapi";
import { PokemonCard } from "@/components/pokemon-card";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { toast } from "sonner";

function usePokemons() {
  return useQuery({
    queryKey: ["pokemons"],
    queryFn: () => getAllPokemon(),
    staleTime: Infinity,
  });
}

export function Pokedex() {
  const { data: pokemons, error, isFetching } = usePokemons();

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  if (isFetching) {
    return <LoadingSpinner />;
  } else if (error) {
    toast("Couldn't load data from Pokeapi", {
      description: error.message,
      action: {
        label: "Ok",
        onClick: () => {},
      },
    });
  }

  return (
    <Carousel className="w-1/2" plugins={[plugin.current]}>
      <CarouselContent>
        {pokemons?.map((pokemon, index) => (
          <CarouselItem key={index}>
            <div>
              <PokemonCard pokemon={pokemon} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
