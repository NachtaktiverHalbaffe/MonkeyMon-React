import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Arena() {
  return (
    <Card className="h-lg w-auto flex items-center justify-center">
      <CardContent className="h-lg w-auto flex items-center justify-center">
        <div className="h-lg w-auto flex items-center justify-center  py-96">
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
      </CardContent>
    </Card>
  );
}
