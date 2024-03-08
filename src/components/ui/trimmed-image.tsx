import { LoadingSpinner } from "@/components/ui/loading-spinner.tsx";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface TrimmedNetworkImageProps {
  src: string;
  trimHeight?: boolean;
  trimWidth?: boolean;
  className?: string;
}

export const TrimmedImage = (props: TrimmedNetworkImageProps) => {
  const [trimmedImageUrl, setTrimmedImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async (
      url: string,
      trimHeight: boolean = true,
      trimWidth: boolean = true
    ) => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();

        const img = new Image();
        img.src = URL.createObjectURL(blob);
        img.crossOrigin = "Anonymous";

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          if (context) {
            canvas.width = img.width;
            canvas.height = img.height;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0);

            const imageData = context.getImageData(
              0,
              0,
              canvas.width,
              canvas.height
            );
            const { data } = imageData;

            let minX = canvas.width;
            let minY = canvas.height;
            let maxX = 0;
            let maxY = 0;

            for (let y = 0; y < canvas.height; y++) {
              for (let x = 0; x < canvas.width; x++) {
                const alpha = data[(y * canvas.width + x) * 4 + 3];

                if (alpha > 0) {
                  minY = Math.min(minY, y);
                  maxY = Math.max(maxY, y);
                  minX = Math.min(minX, x);
                  maxX = Math.max(maxX, x);
                }
              }
            }

            const trimmedWidth = trimWidth ? maxX - minX + 1 : canvas.width;
            const trimmedHeight = trimHeight ? maxY - minY + 1 : canvas.height;
            const trimmedCanvas = document.createElement("canvas");
            const trimmedContext = trimmedCanvas.getContext("2d");

            if (trimmedContext) {
              trimmedCanvas.width = trimmedWidth;
              trimmedCanvas.height = trimmedHeight;
              trimmedContext.drawImage(
                img,
                minX,
                minY,
                trimmedWidth,
                trimmedHeight,
                0,
                0,
                trimmedWidth,
                trimmedHeight
              );
              const trimmedImageData = trimmedCanvas.toDataURL();
              setTrimmedImageUrl(trimmedImageData);
            }
          }
        };
      } catch (error) {
        console.error("Error lading image:", error);
        toast("Couldnt load image", {
          description: "",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      }
    };
    loadImage(props.src, props.trimHeight, props.trimWidth);
  }, [props.src, props.trimHeight, props.trimWidth]);

  return trimmedImageUrl ? (
    <img className={props.className} src={trimmedImageUrl} draggable={false} />
  ) : (
    <LoadingSpinner />
  );
};
