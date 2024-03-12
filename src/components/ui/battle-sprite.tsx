import { TrimmedImage } from "@/components/ui/trimmed-image.tsx";
import { cn } from "@/lib/utils.ts";
import { useWindowSize } from "@uidotdev/usehooks";
import React, { useLayoutEffect, useState, memo } from "react";

interface BattleSpriteProps {
  src: string;

  className?: string;
  alignment?: "left-bottom" | "right-top";
}

const BattleSpriteComponent: React.FunctionComponent<BattleSpriteProps> = (
  props: BattleSpriteProps
) => {
  const posXLeft = -10;
  const posYBottom = 450;
  const posYTop = -180;
  let initialPosX: number;
  let initialPosY: number;
  switch (props.alignment) {
    case "left-bottom":
      initialPosX = posXLeft;
      initialPosY = posYBottom;
      break;
    case "right-top":
      initialPosX = 5000;
      initialPosY = posYTop;
      break;
    default:
      initialPosX = posXLeft;
      initialPosY = posYBottom;
      break;
  }

  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: initialPosX,
    y: initialPosY,
  });
  const size = useWindowSize();

  useLayoutEffect(() => {
    if (size.width != null) {
      const newWidthLimit =
        size.width > 640 ? size.width - 300 : size.width - 260;

      if (size.width > 640) {
        if (newWidthLimit < position.x || props.alignment === "right-top") {
          setPosition({
            x: newWidthLimit - 200,
            y: props.alignment === "right-top" ? posYTop : posYBottom,
          });
        } else {
          setPosition({
            x: position.x,
            y: posYBottom,
          });
        }
      } else {
        if (newWidthLimit < position.x || props.alignment === "right-top") {
          setPosition({
            x: newWidthLimit,
            y:
              props.alignment === "right-top" ? posYTop + 100 : posYBottom + 70,
          });
        } else {
          setPosition({
            x: position.x,
            y: posYBottom + 70,
          });
        }
      }
    }
  }, [size, props.alignment, position.x, posYTop]);

  return (
    <div
      className={cn("relative", props.className)}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      <div className="absolute bottom-0 left-0 w-48 h-24 sm:w-96 sm:h-48 bg-[url('battle_tile.png')] bg-bottom bg-contain bg-no-repeat" />
      <div className="absolute bottom-0 left-0 translate-x-12 -translate-y-4 sm:translate-x-36 sm:-translate-y-16 flex items-center justify-center">
        <TrimmedImage
          className="w-auto h-20 sm:w-auto sm:h-fit sm:scale-[2.0]"
          src={props.src}
          trimWidth={true}
          trimHeight={true}
        />
      </div>
    </div>
  );
};

export const BattleSprite = memo(BattleSpriteComponent);
