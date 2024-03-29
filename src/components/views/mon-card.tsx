import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { StatBar } from "@/components/ui/stat-bar.tsx";
import { useArenaStore } from "@/hooks/use-arena-store.ts";
import { Monkey } from "@/types/monkey.ts";
import { Pokemon, isPokemon } from "@/types/pokemon.ts";
import React from "react";
import favIco from "/favicon.ico";
import { useTranslation } from "react-i18next";

interface MonCardProps {
  mon: Monkey | Pokemon;
}

export const MonCard: React.FunctionComponent<
  React.PropsWithChildren<MonCardProps>
> = (props: React.PropsWithChildren<MonCardProps>) => {
  const setFighter = useArenaStore((state) => state.setFighter);
  const setOpponent = useArenaStore((state) => state.setOpponent);
  const { t } = useTranslation("common");

  return (
    <div className="p-1">
      <Card className="xl:min-h-[47rem]">
        <CardHeader>
          <CardTitle className="sm:text-3xl font-bold">
            {props.mon.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Avatar className="w-48 h-48">
            <AvatarImage
              src={props.mon.image ?? undefined}
              alt="Pokemon image"
            />
            <AvatarFallback>
              <img src={favIco} className="logo" alt="Pokemon picture" />
            </AvatarFallback>
          </Avatar>
          <CardDescription className="text-lg text-justify sm:text-xl xl:min-h-32 py-4">
            {props.mon.description}
          </CardDescription>
          <StatBar
            value={props.mon.hp}
            maxValue={600}
            label={t("moncard.hp")}
          />
          <StatBar
            value={props.mon.attack}
            maxValue={160}
            label={t("moncard.attack")}
          />
          <StatBar
            value={props.mon.defense}
            maxValue={160}
            label={t("moncard.defense")}
          />
          <StatBar
            value={props.mon.specialAttack}
            maxValue={140}
            label={t("moncard.specialAttack")}
          />
          <StatBar
            value={props.mon.specialDefense}
            maxValue={135}
            label={t("moncard.specialDefense")}
          />
          <StatBar
            value={props.mon.speed}
            maxValue={136}
            label={t("moncard.speed")}
          />
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-evenly items-center">
          <Button
            variant="destructive"
            className="w-full sm:w-1/2"
            onClick={() => {
              setFighter({
                currentHp: props.mon.hp,
                mon: props.mon,
              });
              import("sonner").then((module) =>
                module.toast(
                  `${isPokemon(props.mon) ? "Pokemon" : "Monkey"} ${t("moncard.toast.sent_arena_title")}`,
                  {
                    description: `${props.mon.name} ${t("moncard.toast.sent_arena_description_fighter")}`,
                    action: {
                      label: "Ok",
                      onClick: () => {},
                    },
                  }
                )
              );
            }}
          >
            {t("moncard.buttons.send_fighter")}
          </Button>
          <Button
            variant="destructive"
            className="w-full sm:w-1/2"
            onClick={() => {
              setOpponent({
                currentHp: props.mon.hp,
                mon: props.mon,
              });
              import("sonner").then((module) =>
                module.toast(
                  `${isPokemon(props.mon) ? "Pokemon" : "Monkey"} ${t("moncard.toast.sent_arena_title")}`,
                  {
                    description: `${props.mon.name} ${t("moncard.toast.sent_arena_description_opponent")}`,
                    action: {
                      label: "Ok",
                      onClick: () => {},
                    },
                  }
                )
              );
            }}
          >
            {t("moncard.buttons.send_opponent")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
