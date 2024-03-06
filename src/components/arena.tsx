import { Card, CardContent } from "@/components/ui/card";
import { BattleSprite } from "@/components/battle-sprite";

export function Arena() {
  return (
    <Card className="w-auto bg-[url('src/assets/arena_background.jpg')] bg-cover">
      <CardContent className="relative overflow-hidden py-96">
        <div>
          <BattleSprite
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
            posX={-5}
            posY={330}
          />
          <BattleSprite
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/159.png"
            posX={632}
            posY={-180}
          />
        </div>
      </CardContent>
    </Card>
  );
}
