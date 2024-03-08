import { Arena } from "@/components/views/arena.tsx";
import { Mondex } from "@/components/views/mondex.tsx";
import { Pokedex } from "@/components/views/pokedex.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-wrap justify-evenly py-2">
        <Pokedex />
        <Mondex />
      </div>
      <Arena />
    </div>
  );
}
