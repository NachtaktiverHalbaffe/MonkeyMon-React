import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../components/mode-toggle";

export const Route = createFileRoute("/settings")({
  component: Settings,
});

function Settings() {
  return (
    <div className="h-screen w-screen flex items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800">
      <ModeToggle />
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
        Settings
      </Button>
    </div>
  );
}
