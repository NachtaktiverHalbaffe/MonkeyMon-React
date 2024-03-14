import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel.tsx";
import { LoadingSpinner } from "@/components/ui/loading-spinner.tsx";
import { MonCard } from "@/components/views/mon-card.tsx";
import { useMonkeys } from "@/hooks/use-monkeys.ts";
import Autoplay from "embla-carousel-autoplay";
import { AlertCircle } from "lucide-react";
import React, { Suspense, lazy } from "react";
import { useTranslation } from "react-i18next";

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

export function Mondex() {
  const { data: monkeys, error, isFetching } = useMonkeys();
  const { t } = useTranslation("common");

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  if (isFetching) {
    return (
      <div className="flex flex-col justify-center items-center min-w-80 sm:min-w-[500px] xl:min-w-[600px] min-h-[47rem] p-1">
        <LoadingSpinner />
      </div>
    );
  } else if (error) {
    import("sonner").then((module) =>
      module.toast.error(t("mondex.failed_fetch"))
    );

    return (
      <Suspense>
        <div className="flex flex-col justify-center items-center min-w-80 sm:min-w-[500px] xl:min-w-[600px] p-1">
          <Alert variant="destructive" className="">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t("mondex.failed_fetch_title")}</AlertTitle>
            <AlertDescription>{`${error.message}. ${t("mondex.failed_fetch")}`}</AlertDescription>
          </Alert>
        </div>
      </Suspense>
    );
  }

  return (
    <Carousel
      className="w-full xl:w-1/2 min-w-80 sm:min-w-[500px] xl:min-w-[600px]"
      plugins={[plugin.current]}
    >
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
