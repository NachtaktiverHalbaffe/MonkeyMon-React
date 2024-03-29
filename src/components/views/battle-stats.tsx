import vsSprite from "@/assets/vs.png";
import { Combatant } from "@/hooks/use-arena-store.ts";
import { cn } from "@/lib/utils.ts";
import React, { Suspense, lazy, memo } from "react";
import { StatBar } from "@/components/ui/stat-bar.tsx";
import { useTranslation } from "react-i18next";

const Card = lazy(() =>
  import("@/components/ui/card.tsx").then((module) => {
    return { default: module.Card };
  })
);
const CardContent = lazy(() =>
  import("@/components/ui/card.tsx").then((module) => {
    return { default: module.CardContent };
  })
);

const CardDescription = lazy(() =>
  import("@/components/ui/card.tsx").then((module) => {
    return { default: module.CardDescription };
  })
);
const CardTitle = lazy(() =>
  import("@/components/ui/card.tsx").then((module) => {
    return { default: module.CardTitle };
  })
);

type BattleSpriteProps = {
  className?: string;
  fighter: Combatant | null;
  opponent: Combatant | null;
};

const BattleStatsComponent: React.FunctionComponent<BattleSpriteProps> = (
  props: BattleSpriteProps
) => {
  const { t } = useTranslation("common");

  const chooseMonLabel = (label: string) => (
    <p className="py-11 font-mono text-center text-2xl font-bold">{label}</p>
  );

  const battleBox = (mon: Combatant) => {
    return (
      <Suspense>
        <Card className="w-full sm:w-2/6 h-[7rem] rounded-tl-3xl rounded-br-3xl rounded-bl-lg rounded-tr-lg border-4 border-black dark:border-black bg-battle-box-dark dark:bg-battle-box-dark">
          <CardTitle className="px-5 pt-4 font-mono text-black dark:text-black">
            {mon.mon.name}
          </CardTitle>
          <CardDescription className="h-0" />
          <CardContent>
            <StatBar
              value={mon.currentHp}
              maxValue={mon.mon.hp}
              label={t("moncard.hp")}
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
      </Suspense>
    );
  };

  return (
    <div className={cn(props.className)}>
      <div
        className={cn(
          "flex flex-col-reverse sm:flex-row justify-center items-center",
          props.className
        )}
      >
        {props.fighter == null
          ? chooseMonLabel(t("arena.choose_fighter"))
          : battleBox(props.fighter)}
        <img src={vsSprite} className="p-6" />
        {props.opponent == null
          ? chooseMonLabel(t("arena.choose_opponent"))
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
