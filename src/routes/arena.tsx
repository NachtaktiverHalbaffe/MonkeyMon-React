import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/arena")({
  component: Arena,
});

function Arena() {
  return (
    <div className="h-screen w-screen flex items-center justify-center rounded-lg bg-slate-500 d">
      <Button
        variant="destructive"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Arena
      </Button>
    </div>
  );
}
