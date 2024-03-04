import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QueryClient } from "@tanstack/react-query";
import React, { Suspense } from "react";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );
export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="bg-neutral p-1 dark:bg-neutral-700">
      <Tabs defaultValue="pokedex" className="w-auto p-1">
        <TabsList className="grid w-auto grid-cols-4">
          <TabsTrigger value="pokedex">
            <Link to="/pokedex" className="w-screen">
              Pokedex
            </Link>
          </TabsTrigger>
          <TabsTrigger value="mondex">
            <Link to="/mondex" className="w-screen">
              Mondex
            </Link>
          </TabsTrigger>
          <TabsTrigger value="arena">
            <Link to="/arena" className="w-screen">
              Arena
            </Link>
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Link to="/settings" className="w-screen">
              Settings
            </Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pokedex">
          <Outlet />
        </TabsContent>
        <TabsContent value="mondex">
          <Outlet />
        </TabsContent>
        <TabsContent value="arena">
          <Outlet />
        </TabsContent>
        <TabsContent value="settings">
          <Outlet />
        </TabsContent>
      </Tabs>

      <ReactQueryDevtools buttonPosition="bottom-right" />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </div>
  );
}
