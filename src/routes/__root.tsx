import { Card, CardContent } from "@/components/ui/card.tsx";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
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
    <div className="h-full bg-neutral py-4 px-4 dark:bg-neutral-800">
      <Card>
        <CardContent>
          <Tabs defaultValue="pokedex" className="w-96 py-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pokedex">
                <Link to="/" className="w-screen">
                  MonkeyMon
                </Link>
              </TabsTrigger>

              <TabsTrigger value="settings">
                <Link to="/settings" className="w-screen">
                  Settings
                </Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Outlet />

          <ReactQueryDevtools buttonPosition="bottom-right" />
          <Suspense>
            <TanStackRouterDevtools />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
