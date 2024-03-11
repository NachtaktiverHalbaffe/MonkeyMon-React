import { TrimmedImage } from "@/components/ui/trimmed-image.tsx";
import { cn } from "@/lib/utils.ts";
import { useWindowSize } from "@uidotdev/usehooks";
import React, { useLayoutEffect, useState } from "react";

interface BattleSpriteProps {
  src: string;
  posX?: number;
  posY?: number;
  className?: string;
  alignment?: "left" | "left-bottom" | "right" | "right-top" | "manual";
}

export const BattleSprite = (props: BattleSpriteProps) => {
  const posXLeft = -10;
  const posYBottom = 450;
  const posYTop = -180;
  let initialPosX: number;
  let initialPosY: number;
  switch (props.alignment) {
    case "left":
      initialPosX = posXLeft;
      initialPosY = props.posY ?? posYBottom;
      break;
    case "left-bottom":
      initialPosX = posXLeft;
      initialPosY = posYBottom;
      break;
    case "right":
      initialPosX = 5000;
      initialPosY = props.posY ?? posYTop;
      break;
    case "right-top":
      initialPosX = 5000;
      initialPosY = posYTop;
      break;
    case "manual":
      initialPosX = props.posX ?? posXLeft;
      initialPosY = props.posY ?? posYBottom;
      break;
    default:
      initialPosX = props.posX ?? posXLeft;
      initialPosY = props.posY ?? posYBottom;
      break;
  }

  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: initialPosX,
    y: initialPosY,
  });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPosition, setStartPosition] = useState<{ x: number; y: number }>({
    x: initialPosX,
    y: initialPosY,
  });
  const size = useWindowSize();
  const [widthLimit, setWidthLimit] = useState<number>(0);

  useLayoutEffect(() => {
    if (size.width != null) {
      const newWidthLimit =
        size.width > 640 ? size.width - 300 : size.width - 260;
      setWidthLimit(newWidthLimit);

      if (
        newWidthLimit < position.x ||
        props.alignment == "right" ||
        props.alignment == "right-top"
      ) {
        size.width > 640
          ? setPosition({
              y: props.alignment === "right-top" ? posYTop : position.y,
              x: newWidthLimit - 200,
            })
          : setPosition({
              y:
                props.alignment === "right-top"
                  ? posYTop - 100
                  : position.y - 100,
              x: newWidthLimit,
            });
      }
    }
  }, [size, props.alignment]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartPosition({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const newPosX = event.clientX - startPosition.x;
      setPosition({
        x: newPosX > widthLimit ? widthLimit - 200 : newPosX,
        y: event.clientY - startPosition.y,
      });
    }
  };

  return (
    <div
      className={cn("relative", props.className)}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
    >
      <div className="absolute bottom-0 left-0 w-36 h-16 sm:w-96 sm:h-48 bg-[url('battle_tile.png')] bg-bottom bg-contain bg-no-repeat" />
      <div
        className="absolute bottom-0 left-0 translate-x-9 -translate-y-4 sm:translate-x-36 sm:-translate-y-16 flex items-center justify-center"
        onMouseDown={handleMouseDown}
      >
        <TrimmedImage
          className="w-16 h-16 sm:w-auto sm:h-fit sm:scale-[2.0]"
          src={props.src}
          trimWidth={true}
          trimHeight={true}
        />
      </div>
    </div>
  );
};
