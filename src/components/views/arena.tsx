import { Card, CardContent } from "@/components/ui/card";
import { BattleSprite } from "@/components/ui/battle-sprite";
import { useArenaStore } from "@/hooks/use-arena-store";

export function Arena() {
  const fighter = useArenaStore((state) => state.fighter);
  const opponent = useArenaStore((state) => state.opponent);

  return (
    <Card className="w-auto bg-[url('arena_background.jpg')] bg-cover">
      <CardContent className="relative overflow-hidden py-96">
        <div>
          {/* Fighter */}
          <BattleSprite
            src={
              fighter?.mon.imageBack ??
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/0.png"
            }
            posX={-5}
            posY={330}
          />
          {/* Opponent */}
          <BattleSprite
            src={
              opponent?.mon.imageFront ??
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/0.png"
            }
            posX={5000}
            posY={-180}
          />
        </div>
      </CardContent>
    </Card>
  );
}
