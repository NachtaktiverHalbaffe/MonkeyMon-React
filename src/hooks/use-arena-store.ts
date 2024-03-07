import { Monkey } from "@/types/monkey";
import { Pokemon, isPokemon } from "@/types/pokemon";
import { create } from "zustand";

export type Combatant = {
  currentHp: number;
  mon: Monkey | Pokemon;
};

export type ArenaState = {
  fighter: Combatant | null;
  opponent: Combatant | null;
};

type ArenaActions = {
  setFighter: (fighter: Combatant) => void;
  setOpponent: (opponent: Combatant) => void;
  damageFighter: (damage: number) => void;
  damageOpponent: (damage: number) => void;
};

export const useArenaStore = create<ArenaState & ArenaActions>((set) => ({
  fighter: null,
  opponent: null,
  setFighter: (fighter) =>
    set(() => {
      if (isPokemon(fighter.mon)) {
        return {
          fighter: {
            ...fighter,
            mon: {
              ...fighter.mon,
              image: fighter.mon.imageBack,
            },
          },
        };
      } else {
        return { fighter: fighter };
      }
    }),
  setOpponent: (opponent) =>
    set(() => {
      if (isPokemon(opponent.mon)) {
        return {
          opponent: {
            ...opponent,
            mon: {
              ...opponent.mon,
              image: opponent.mon.imageFront,
            },
          },
        };
      } else {
        return { opponent: opponent };
      }
    }),
  damageFighter: (damage) =>
    set((state) =>
      state.fighter != null
        ? {
            fighter: {
              ...state.fighter,
              currentHp: state.fighter.currentHp - damage,
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
              currentHp: state.opponent.currentHp - damage,
            },
          }
        : {}
    ),
}));
