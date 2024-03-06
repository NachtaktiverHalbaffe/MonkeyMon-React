import { Card, CardContent } from "@/components/ui/card";
import { BattleSprite } from "@/components/battle-sprite";
import { Pokemon } from "@/api/pokeapi";
import { create } from "zustand";

type Mon = {
  currentHp: number;
  mon: Pokemon;
};

type ArenaState = {
  fighter: Mon | null;
  opponent: Mon | null;
};

type ArenaActions = {
  setFighter: (fighter: Mon) => void;
  setOpponent: (opponent: Mon) => void;
  damageFighter: (damage: number) => void;
  damageOpponent: (damage: number) => void;
};

export const useArenaStore = create<ArenaState & ArenaActions>((set) => ({
  fighter: null,
  opponent: null,
  setFighter: (fighter) => set(() => ({ fighter: fighter })),
  setOpponent: (opponent) => set(() => ({ opponent: opponent })),
  damageFighter: (damage) =>
    set((state) =>
      state.fighter != null
        ? {
            fighter: {
              ...state.fighter,
              currentHp: state.fighter?.currentHp ?? 0 - damage,
            },
          }
        : {}
    ),
  damageOpponent: (damage) =>
    set((state) =>
      state.opponent != null
        ? {
            opponent: {
              ...state.opponent,
              currentHp: state.opponent?.currentHp ?? 0 - damage,
            },
          }
        : {}
    ),
}));

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
            posX={632}
            posY={-180}
          />
        </div>
      </CardContent>
    </Card>
  );
}
