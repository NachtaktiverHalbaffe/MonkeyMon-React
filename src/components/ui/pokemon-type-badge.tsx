import { Badge } from "@/components/ui/badge";
import bug from "@/assets/bug.png";
import dark from "@/assets/dark.png";
import dragon from "@/assets/dragon.png";
import electric from "@/assets/electric.png";
import fairy from "@/assets/fairy.png";
import fighting from "@/assets/fighting.png";
import fire from "@/assets/fire.png";
import flying from "@/assets/flying.png";
import ghost from "@/assets/ghost.png";
import grass from "@/assets/grass.png";
import ground from "@/assets/ground.png";
import ice from "@/assets/ice.png";
import normal from "@/assets/normal.png";
import poison from "@/assets/poison.png";
import psychic from "@/assets/psychic.png";
import rock from "@/assets/rock.png";
import steel from "@/assets/steel.png";
import water from "@/assets/water.png";

interface PokemonTypeBadgeProps {
  type: string;
}

export function PokemonTypeBadge(props: PokemonTypeBadgeProps) {
  let color: string;
  let image: string;

  switch (props.type) {
    case "bug":
      image = bug;
      color = "bg-teal-700";
      break;
    case "dark":
      image = dark;
      color = "bg-black";
      break;
    case "dragon":
      image = dragon;
      color = "bg-indigo-900";
      break;
    case "electric":
      image = electric;
      color = "bg-yellow-400";
      break;
    case "fairy":
      image = fairy;
      color = "bg-fuchsia-500";
      break;
    case "fighting":
      image = fighting;
      color = "bg-orange-800";
      break;
    case "fire":
      image = fire;
      color = "bg-red-700";
      break;
    case "flying":
      image = flying;
      color = "bg-sky-600";
      break;
    case "ghost":
      image = ghost;
      color = "bg-neutral-600";
      break;
    case "grass":
      image = grass;
      color = "bg-green-900";
      break;
    case "ground":
      image = ground;
      color = "bg-amber-950";
      break;
    case "ice":
      image = ice;
      color = "bg-cyan-500";
      break;
    case "normal":
      image = normal;
      color = "bg-neutral-500";
      break;
    case "poison":
      image = poison;
      color = "bg-violet-950";
      break;
    case "psychic":
      image = psychic;
      color = "bg-pink-400";
      break;
    case "rock":
      image = rock;
      color = "bg-orange-950";
      break;
    case "steel":
      image = steel;
      color = "bg-stone-800";
      break;
    case "water":
      image = water;
      color = "bg-blue-800";
      break;
    default:
      image = normal;
      color = "bg-neutral-900";
      break;
  }

  return (
    <Badge className={`${color} dark:${color} w-fit`}>
      <div className="flex flex-row gap-2">
        <img src={image!} width={12} height={12} color="#000000" />
        <div className="text-medium font-bold text-white">
          {props.type.charAt(0).toUpperCase() + props.type.slice(1)}
        </div>
      </div>
    </Badge>
  );
}
