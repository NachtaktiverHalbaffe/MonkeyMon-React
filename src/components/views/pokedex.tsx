import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { MonCard } from "@/components/views/mon-card";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { toast } from "sonner";
import { usePokemons } from "@/hooks/use-pokemons";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function Pokedex() {
  const { data: pokemons, error, isFetching } = usePokemons();

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  if (isFetching) {
    return (
      <div className="flex flex-col justify-center items-center  min-w-[600px] p-1">
        <LoadingSpinner />
      </div>
    );
  } else if (error) {
    toast.error("Couldn't load data from Pokeapi", {
      description: error.message,

      action: {
        label: "OK",
        onClick: () => {},
      },
    });
    return (
      <div className="flex flex-col justify-center items-center  min-w-[600px] p-1">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Couldn't load data from Pokeapi</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <Carousel className="w-1/2 min-w-[600px]" plugins={[plugin.current]}>
      <CarouselContent>
        {pokemons?.map((pokemon, index) => (
          <CarouselItem key={index}>
            <MonCard mon={pokemon} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
