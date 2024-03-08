import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { toast } from "sonner";
import { LoadingSpinner } from "../ui/loading-spinner";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useMonkeys } from "@/hooks/use-monkeys";
import { MonCard } from "@/components/views/mon-card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function Mondex() {
  const { data: monkeys, error, isFetching } = useMonkeys();

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
    toast.error(
      "Couldn't load data from MonkeyAPI. Maybe CORS isnt disabled in Browser or MonkeyAPI isnt running on localhost?"
    );
    return (
      <div className="flex flex-col justify-center items-center  min-w-[600px] p-1">
        <Alert variant="destructive" className="">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Couldn't load data from MonkeyAPI</AlertTitle>
          <AlertDescription>{`${error.message}. Maybe CORS isnt disabled in Browser or MonkeyAPI isnt running on localhost?`}</AlertDescription>
        </Alert>
      </div>
    );
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
