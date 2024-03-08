import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { toast } from "sonner";
import { LoadingSpinner } from "../ui/loading-spinner";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useMonkeys } from "@/hooks/use-monkeys";
import { MonCard } from "@/components/views/mon-card";

export function Mondex() {
  const { data: monkeys, error, isFetching } = useMonkeys();

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  if (isFetching) {
    return <LoadingSpinner />;
  } else if (error) {
    toast("Couldn't load data from MonkeyAPI", {
      description: `${error.message}. Maybe CORS isnt disabled in Browser or MonkeyAPI isnt running on localhost?`,
      duration: 10000,
      action: {
        label: "OK",
        onClick: () => {},
      },
    });
  }

  return (
    <Carousel className="w-1/2 min-w-[600px]" plugins={[plugin.current]}>
      <CarouselContent>
        {monkeys?.map((monkey, index) => (
          <CarouselItem key={index}>
            <MonCard mon={monkey} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
