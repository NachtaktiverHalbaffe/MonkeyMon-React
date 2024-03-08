import { createFileRoute } from "@tanstack/react-router";
import { Pokedex } from "@/components/views/pokedex";
import { Mondex } from "@/components/views/mondex";
import { Arena } from "@/components/views/arena";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-row justify-evenly py-2">
        <Pokedex />
        <Mondex />
      </div>
      <Arena />
    </div>
  );
}
