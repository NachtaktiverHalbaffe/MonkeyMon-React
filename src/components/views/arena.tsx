import { Card, CardContent } from "@/components/ui/card";
import { BattleSprite } from "@/components/ui/battle-sprite";
import { useArenaStore } from "@/hooks/use-arena-store";
import { BattleStats } from "@/components/views/battle-stats";
import { usePokemonBattle } from "@/hooks/use-pokemon-battle";
import { useEffect } from "react";

export function Arena() {
  const fighter = useArenaStore((state) => state.fighter);
  const opponent = useArenaStore((state) => state.opponent);
  const setFighter = useArenaStore((state) => state.setFighter);
  const setOpponent = useArenaStore((state) => state.setOpponent);
  const battleEngine = usePokemonBattle(fighter, opponent);
  const MINUTE_MS = 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      const battleState = battleEngine.next();

      if (
        battleState.value?.fighter != null &&
        battleState.value?.opponent != null
      ) {
        setFighter(battleState.value.fighter!);
        setOpponent(battleState.value.opponent!);
      }
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, [battleEngine, fighter, opponent, setFighter, setOpponent]);

  return (
    <Card className="w-auto bg-[url('arena_background.jpg')] bg-cover">
      <CardContent className="relative overflow-hidden py-96">
        <div>
          {/* Fighter */}
          <BattleSprite
            src={
              fighter?.mon.image ??
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/0.png"
            }
            posX={-5}
            posY={330}
          />
          {/* Opponent */}
          <BattleSprite
            src={
              opponent?.mon.image ??
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/0.png"
            }
            posX={5000}
            posY={-180}
          />

          <BattleStats />
        </div>
      </CardContent>
    </Card>
  );
}
