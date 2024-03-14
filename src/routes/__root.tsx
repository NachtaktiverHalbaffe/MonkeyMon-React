import { Card, CardContent } from "@/components/ui/card.tsx";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";

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
  const { location } = useRouterState();
  const { t } = useTranslation("common");
  const initialPath = location.pathname.split("/").pop();

  return (
    <div className="bg-neutral min-h-screen p-1 sm:p-4 dark:bg-neutral-800">
      <Card>
        <CardContent>
          <Tabs
            defaultValue={initialPath == "" ? "monkeymon" : initialPath}
            className="w-fit sm:min-w-96 py-4"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="monkeymon">
                <Link to="/" className="w-full h-full">
                  MonkeyMon
                </Link>
              </TabsTrigger>
              <TabsTrigger value="statistics">
                <Link to="/statistics" className="w-full h-full">
                  {t("root.statistics")}
                </Link>
              </TabsTrigger>

              <TabsTrigger value="monkeyapi">
                <Link to="/monkeyapi" className="w-full h-full">
                  MonkeyAPI
                </Link>
              </TabsTrigger>

              <TabsTrigger value="settings">
                <Link to="/settings" className="w-full h-full">
                  {t("root.settings")}
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
