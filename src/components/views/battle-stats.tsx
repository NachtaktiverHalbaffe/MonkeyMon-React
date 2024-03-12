import vsSprite from "@/assets/vs.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card.tsx";
import { StatBar } from "@/components/ui/stat-bar.tsx";
import { Combatant } from "@/hooks/use-arena-store.ts";
import { cn } from "@/lib/utils.ts";
import React, { memo } from "react";

type BattleSpriteProps = {
  className?: string;
  fighter: Combatant | null;
  opponent: Combatant | null;
};

const BattleStatsComponent: React.FunctionComponent<BattleSpriteProps> = (
  props: BattleSpriteProps
) => {
  const chooseMonLabel = (label: string) => (
    <p className="py-11 font-mono text-center text-2xl font-bold">{label}</p>
  );

  const battleBox = (mon: Combatant) => (
    <Card className="w-full sm:w-2/6 h-[7rem] rounded-tl-3xl rounded-br-3xl rounded-bl-lg rounded-tr-lg border-4 border-black dark:border-black bg-battle-box-dark dark:bg-battle-box-dark">
      <CardTitle className="px-5 pt-4 font-mono text-black dark:text-black">
        {mon.mon.name}
      </CardTitle>
      <CardDescription className="h-0" />
      <CardContent>
        <StatBar
          value={mon.currentHp}
          maxValue={mon.mon.hp}
          label={"KP"}
          className="text-black dark:text-black pb-0"
          classNameWidth="w-12"
        />
        <div className="flex flex-col items-end text-end">
          <p className="text-black dark:text-black italic pb-2 pt-0">
            {mon.currentHp}/{mon.mon.hp}
          </p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={cn(props.className)}>
      <div
        className={cn(
          "flex flex-col-reverse sm:flex-row justify-center items-center",
          props.className
        )}
      >
        {props.fighter == null
          ? chooseMonLabel("Choose Fighter")
          : battleBox(props.fighter)}
        <img src={vsSprite} className="p-6" />
        {props.opponent == null
          ? chooseMonLabel("Choose Opponent")
          : battleBox(props.opponent)}
      </div>
    </div>
  );
};

export const BattleStats = memo(BattleStatsComponent, (oldProps, newProps) => {
  return (
    oldProps.fighter?.currentHp == newProps.fighter?.currentHp &&
    oldProps.fighter?.mon.name == newProps.fighter?.mon.name &&
    oldProps.opponent?.currentHp == newProps.opponent?.currentHp &&
    oldProps.opponent?.mon.name == newProps.opponent?.mon.name
  );
});
