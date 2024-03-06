import { TrimmedImage } from "@/components/ui/trimmed-image";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

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

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartPosition({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });
    console.log(position);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      setPosition({
        x: event.clientX - startPosition.x,
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
