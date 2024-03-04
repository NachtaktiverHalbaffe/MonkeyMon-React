import { createFileRoute } from "@tanstack/react-router";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-700 dark:bg-gray-700">
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>
  );
}
