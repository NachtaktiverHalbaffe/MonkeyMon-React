import { Pokemon } from "@/api/pokeapi";
import { create } from "zustand";

export type Mon = {
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
