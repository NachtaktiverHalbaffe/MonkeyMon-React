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
import viteLogo from "/vite.svg";

interface PokemonCardProps {
  imageFront?: string;
  imageBack?: string;
  name: string;
  description: string;
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  types: Array<string>;
}

export const PokemonCard = (props: PokemonCardProps) => {
  return (
    <Card>
      <CardHeader>
        <Avatar>
          <AvatarImage src={props.imageFront} alt="Avatar Image" />
          <AvatarFallback>
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </AvatarFallback>
        </Avatar>
        <CardTitle>{props.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{props.description}</CardDescription>
      </CardContent>
      <CardFooter>
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
