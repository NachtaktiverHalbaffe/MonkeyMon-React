import { Combatant, useArenaStore } from "@/hooks/use-arena-store";
import vsSprite from "@/assets/vs.png";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { StatBar } from "../ui/stat-bar";

type BattleSpriteProps = {
  className?: string;
};

export function BattleStats(props: BattleSpriteProps) {
  const fighter = useArenaStore((state) => state.fighter);
  const opponent = useArenaStore((state) => state.opponent);

  const chooseMonLabel = (label: string) => (
    <p className="p-2 font-mono text-2xl font-bold">{label}</p>
  );

  const battleBox = (mon: Combatant) => (
    <Card className="w-2/6 h-[7rem] rounded-tl-3xl rounded-br-3xl rounded-bl-lg rounded-tr-lg border-4 border-black dark:border-black bg-battle-box-dark dark:bg-battle-box-dark">
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
        <div className="flex flex-col items-end text-end pb-2 pt-0">
          <p className="text-black dark:text-black italic">
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
          "flex flex-row justify-center items-center",
          props.className
        )}
      >
        {fighter == null
          ? chooseMonLabel("Choose Fighter")
          : battleBox(fighter)}
        <img src={vsSprite} className="p-6" />
        {opponent == null
          ? chooseMonLabel("Choose Opponent")
          : battleBox(opponent)}
      </div>
    </div>
  );
}
