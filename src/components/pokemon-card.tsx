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
import { Pokemon } from "@/api/pokeapi";
import { StatBar } from "@/components/stat-bar";
import viteLogo from "/vite.svg";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard = (props: PokemonCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">
          {props.pokemon.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Avatar className="w-48 h-48">
          <AvatarImage
            src={props.pokemon.imageFront ?? undefined}
            alt="Avatar Image"
          />
          <AvatarFallback>
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </AvatarFallback>
        </Avatar>
        <CardDescription className="text-xl py-4">
          {props.pokemon.description}
        </CardDescription>
        <StatBar value={props.pokemon.hp} maxValue={600} label="KP" />
        <StatBar value={props.pokemon.attack} maxValue={160} label="Angriff" />
        <StatBar
          value={props.pokemon.defense}
          maxValue={160}
          label="Verteidigung"
        />
        <StatBar
          value={props.pokemon.specialAttack}
          maxValue={140}
          label="Sp. Angriff"
        />
        <StatBar
          value={props.pokemon.specialDefense}
          maxValue={135}
          label="Sp. Verteidigung"
        />
        <StatBar
          value={props.pokemon.speed}
          maxValue={136}
          label="Initiative"
        />
      </CardContent>
      <CardFooter className="flex flex-wrap justify-evenly">
        <Button variant="destructive" onClick={() => {}}>
          Als Kämpfer in die Arena schicken
        </Button>
        <Button variant="destructive" onClick={() => {}}>
          Als Gegner in die Arena schicken
        </Button>
      </CardFooter>
    </Card>
  );
};
