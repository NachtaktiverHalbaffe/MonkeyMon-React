import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { RoundedDiv } from "@/components/ui/rounded-div";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { queryOptions } from "@tanstack/react-query";
import { getAllPokemon } from "@/api/pokeapi";

const pokeApiQueryOptions = queryOptions({
  queryKey: ["pokemons"],
  queryFn: () => getAllPokemon(),
});

export const Route = createFileRoute("/pokedex")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(pokeApiQueryOptions),
  component: Pokedex,
});

function Pokedex() {
  return (
    <RoundedDiv className="bg-neutral-100 p-1 dark:bg-neutral-800">
      <Carousel>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
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
