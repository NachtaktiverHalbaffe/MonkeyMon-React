import { TrimmedImage } from "@/components/ui/trimmed-image";
import { cn } from "@/lib/utils";
import React, { useLayoutEffect, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";

interface BattleSpriteProps {
  src: string;
  posX: number;
  posY: number;
  className?: string;
  isExternal?: boolean;
}

export const BattleSprite = (props: BattleSpriteProps) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: props.posX,
    y: props.posY,
  });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPosition, setStartPosition] = useState<{ x: number; y: number }>({
    x: props.posX,
    y: props.posY,
  });
  const size = useWindowSize();
  const [widthLimit, setWidthLimit] = useState<number>(0);

  useLayoutEffect(() => {
    if (size.width != null) {
      const newWidthLimit = size.width - 300;
      setWidthLimit(newWidthLimit);

      if (newWidthLimit < position.x) {
        setPosition({
          ...position,
          x: newWidthLimit - 200,
        });
      }
    }
  }, [size, position]);

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
      className="relative"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
    >
      <div
        className={cn(
          "absolute bottom-0 left-0 w-96 h-48 bg-[url('battle_tile.png')] bg-bottom bg-contain bg-no-repeat",
          props.className
        )}
      />
      <div
        className="absolute bottom-0 left-0 w-auto h-fit translate-x-36 -translate-y-16 scale-[2.0] flex items-center justify-center"
        onMouseDown={handleMouseDown}
      >
        <TrimmedImage src={props.src} trimWidth={true} trimHeight={true} />
      </div>
    </div>
  );
};
