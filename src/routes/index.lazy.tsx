import { Arena } from "@/components/views/arena.tsx";
import { Mondex } from "@/components/views/mondex.tsx";
import { Pokedex } from "@/components/views/pokedex.tsx";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col h-full w-full justify-evenly">
      <div className="flex flex-wrap justify-evenly items-center py-2">
        <Pokedex />
        <Mondex />
      </div>
      <Arena />
    </div>
  );
}
