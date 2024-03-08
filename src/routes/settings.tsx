import { Button } from "@/components/ui/button.tsx";
import { RoundedDiv } from "@/components/ui/rounded-div.tsx";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { ModeToggle } from "@/components/mode-toggle.tsx";

export const Route = createFileRoute("/settings")({
  component: Settings,
});

function Settings() {
  return (
    <RoundedDiv className="bg-neutral-100 p-1 dark:bg-neutral-800">
      <ModeToggle />
      <Button
        variant="outline"
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
    </RoundedDiv>
  );
}
