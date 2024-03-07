import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { PokemonCard } from "@/components/views/pokemon-card";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { toast } from "sonner";
import { usePokemons } from "@/hooks/use-pokemons";

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
            <div className="p-1">
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