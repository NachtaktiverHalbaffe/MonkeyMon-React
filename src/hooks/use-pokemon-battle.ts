import { ArenaState, Mon } from "@/hooks/use-arena-store";

export function* usePokemonBattle(fighter: Mon | null, opponent: Mon | null) {
  let battleState: ArenaState = { fighter: fighter, opponent: opponent };

  const fighterIsFaster = (): boolean => {
    if (fighter == null || opponent == null) {
      throw Error("Fighter and opponent must both be set");
    }
    return fighter.mon.speed >= opponent.mon.speed;
  };

  const calculateDamage = (attacker: Mon, defender: Mon): number => {
    const damage = attacker.mon.attack - defender.mon.defense;
    return damage > 0 ? damage : 1;
  };

  // Wait until all fighter are set
  while (fighter == null || opponent == null) {
    console.debug("Either fighter or opponent isnt set");
    yield { fighter: null, opponent: null };
  }

  while (fighter.currentHp > 0 && opponent.currentHp > 0) {
    if (fighterIsFaster()) {
      battleState = {
        ...battleState,
        opponent: {
          ...battleState.opponent!,
          currentHp:
            battleState.opponent!.currentHp -
            calculateDamage(fighter, opponent),
        },
      };

      if (battleState.opponent!.currentHp <= 0) {
        yield battleState;
        break;
      }

      battleState = {
        ...battleState,
        fighter: {
          ...battleState.fighter!,
          currentHp:
            battleState.fighter!.currentHp - calculateDamage(opponent, fighter),
        },
      };
    } else {
      battleState = {
        ...battleState,
        fighter: {
          ...battleState.fighter!,
          currentHp:
            battleState.fighter!.currentHp - calculateDamage(opponent, fighter),
        },
      };

      if (battleState.fighter!.currentHp <= 0) {
        yield battleState;
        break;
      }
      battleState = {
        ...battleState,
        opponent: {
          ...battleState.opponent!,
          currentHp:
            battleState.opponent!.currentHp -
            calculateDamage(fighter, opponent),
        },
      };
    }
    console.debug("One round fought");
    console.debug("HP Fighter: ", battleState.fighter!.currentHp);
    console.debug("HP Opponent: ", battleState.opponent!.currentHp);

    yield battleState;
  }
  yield battleState;
  return battleState;
}
