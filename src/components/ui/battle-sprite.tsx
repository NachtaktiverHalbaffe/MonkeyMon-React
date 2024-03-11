import { TrimmedImage } from "@/components/ui/trimmed-image.tsx";
import { cn } from "@/lib/utils.ts";
import { useWindowSize } from "@uidotdev/usehooks";
import React, { useLayoutEffect, useState } from "react";

interface BattleSpriteProps {
  src: string;

  className?: string;
  alignment?: "left-bottom" | "right-top";
}

export const BattleSprite = (props: BattleSpriteProps) => {
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
      <div className="absolute bottom-0 left-0 w-48 h-24 sm:w-96 sm:h-48 bg-[url('battle_tile.png')] bg-bottom bg-contain bg-no-repeat" />
      <div
        className="absolute bottom-0 left-0 translate-x-12 -translate-y-4 sm:translate-x-36 sm:-translate-y-16 flex items-center justify-center"
        onMouseDown={handleMouseDown}
      >
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
