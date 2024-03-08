import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatBar } from "@/components/ui/stat-bar";
import favIco from "/favicon.ico";
import { useArenaStore } from "@/hooks/use-arena-store";
import { toast } from "sonner";
import React from "react";
import { Pokemon } from "@/types/pokemon";
import { Monkey } from "@/types/monkey";

interface MonCardProps {
  mon: Monkey | Pokemon;
}

export const MonCard = (props: React.PropsWithChildren<MonCardProps>) => {
  const setFighter = useArenaStore((state) => state.setFighter);
  const setOpponent = useArenaStore((state) => state.setOpponent);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{props.mon.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Avatar className="w-48 h-48">
          <AvatarImage src={props.mon.image ?? undefined} alt="Avatar Image" />
          <AvatarFallback>
            <img src={favIco} className="logo" alt="Vite logo" />
          </AvatarFallback>
        </Avatar>
        <CardDescription className="text-xl py-4">
          {props.mon.description}
        </CardDescription>
        <StatBar value={props.mon.hp} maxValue={600} label="KP" />
        <StatBar value={props.mon.attack} maxValue={160} label="Angriff" />
        <StatBar
          value={props.mon.defense}
          maxValue={160}
          label="Verteidigung"
        />
        <StatBar
          value={props.mon.specialAttack}
          maxValue={140}
          label="Sp. Angriff"
        />
        <StatBar
          value={props.mon.specialDefense}
          maxValue={135}
          label="Sp. Verteidigung"
        />
        <StatBar value={props.mon.speed} maxValue={136} label="Initiative" />
      </CardContent>
      <CardFooter className="flex flex-wrap justify-evenly">
        <Button
          variant="destructive"
          onClick={() => {
            setFighter({
              currentHp: props.mon.hp,
              mon: props.mon,
            });
            toast(`Pokemon has been sent to Arena`, {
              description: `${props.mon.name} has been selected as the fighter`,
              action: {
                label: "Ok",
                onClick: () => {},
              },
            });
          }}
        >
          Als Kämpfer in die Arena schicken
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            setOpponent({
              currentHp: props.mon.hp,
              mon: props.mon,
            });
            toast(`Pokemon has been sent to Arena`, {
              description: `${props.mon.name} has been selected as the opponent`,
              action: {
                label: "Ok",
                onClick: () => {},
              },
            });
          }}
        >
          Als Gegner in die Arena schicken
        </Button>
      </CardFooter>
    </Card>
  );
};
