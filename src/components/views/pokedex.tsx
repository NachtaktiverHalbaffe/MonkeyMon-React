import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel.tsx";
import { LoadingSpinner } from "@/components/ui/loading-spinner.tsx";
import { MonCard } from "@/components/views/mon-card.tsx";
import { usePokemonsPagable } from "@/hooks/use-pokemons.ts";
import Autoplay from "embla-carousel-autoplay";
import React, { Suspense, lazy, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { pageSize } from "@/api/pokeapi";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export function Pokedex() {
  const {
    data: pokemons,
    error,
    isFetching,
    fetchNextPage,
  } = usePokemonsPagable();
  const { ref: lastItemRef, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  if (isFetching && (pokemons == null || pokemons.pages.length == 0)) {
    return (
      <div className="flex flex-col justify-center items-center min-w-80 sm:min-w-[500px] xl:min-w-[600px] min-h-[47rem] p-1">
        <LoadingSpinner />
      </div>
    );
  } else if (error) {
    import("sonner").then((module) =>
      module.toast.error("Couldn't load data from Pokeapi", {
        description: error.message,
      })
    );

    const Alert = lazy(() =>
      import("@/components/ui/alert.tsx").then((module) => {
        return { default: module.Alert };
      })
    );
    const AlertDescription = lazy(() =>
      import("@/components/ui/alert.tsx").then((module) => {
        return { default: module.AlertDescription };
      })
    );
    const AlertTitle = lazy(() =>
      import("@/components/ui/alert.tsx").then((module) => {
        return { default: module.AlertTitle };
      })
    );

    return (
      <Suspense>
        <div className="flex flex-col justify-center items-center min-w-80 sm:min-w-[500px] xl:min-w-[600px] p-1">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Couldn't load data from Pokeapi</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        </div>
      </Suspense>
    );
  }

  return (
    <Carousel
      className="w-full xl:w-1/2 min-w-80 sm:min-w-[500px] xl:min-w-[600px]"
      plugins={[plugin.current]}
      opts={{
        startIndex:
          pokemons?.pages != null
            ? pageSize * pokemons.pages[pokemons.pages.length - 1].currentPage -
              1
            : 0,
      }}
    >
      <CarouselContent>
        {pokemons?.pages
          .map((pages) => pages.data)
          .map((page, pageIndex) =>
            page.map((pokemon, index) => {
              // Give last item ref so infinitequery can fetch next page
              return pageIndex == pokemons.pages.length - 1 &&
                index == pageSize - 1 ? (
                <CarouselItem key={index} ref={lastItemRef}>
                  <MonCard mon={pokemon} />
                </CarouselItem>
              ) : (
                <CarouselItem key={index}>
                  <MonCard mon={pokemon} />
                </CarouselItem>
              );
            })
          )}
        {pokemons?.pages != null
          ? pokemons.pages[pokemons.pages.length - 1].nextPage != null
          : false && (
              <Card className="xl:min-h-[47rem]">
                <CardContent className="flex flex-col items-center">
                  <LoadingSpinner />
                </CardContent>
              </Card>
            )}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
