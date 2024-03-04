import { createFileRoute } from "@tanstack/react-router";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import { RoundedDiv } from "@/components/ui/rounded-div";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <RoundedDiv className="bg-neutral-100 p-1 dark:bg-neutral-800">
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </RoundedDiv>
  );
}
