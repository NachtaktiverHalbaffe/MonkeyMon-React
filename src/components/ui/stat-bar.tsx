import { Progress } from "@/components/ui/progress.tsx";
import { cn } from "@/lib/utils.ts";

interface StatBarPros {
  value: number;
  maxValue: number;
  label: string;
  className?: string;
  classNameWidth?: string;
}

export const StatBar = (props: StatBarPros) => {
  const progressValue = (props.value / props.maxValue) * 100;

  let color: string = "bg-green-700";
  if (progressValue > 90) {
    color = "bg-green-700";
  } else if (progressValue > 74) {
    color = "bg-green-400";
  } else if (progressValue > 49) {
    color = "bg-yellow-600";
  } else if (progressValue > 24) {
    color = "bg-orange-500";
  } else {
    color = "bg-red-800";
  }

  return (
    <div
      className={cn("w-full py-2 flex flex-row items-center", props.className)}
    >
      <div className={props.classNameWidth ?? "w-48"}>{props.label}</div>
      <Progress indicatorColor={color} value={progressValue} />
    </div>
  );
};
