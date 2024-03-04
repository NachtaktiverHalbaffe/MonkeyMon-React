import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { RoundedDiv } from "@/components/ui/rounded-div";

export const Route = createFileRoute("/arena")({
  component: Arena,
});

function Arena() {
  return (
    <RoundedDiv className="bg-neutral-100 p-1 dark:bg-neutral-800">
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
    </RoundedDiv>
  );
}
