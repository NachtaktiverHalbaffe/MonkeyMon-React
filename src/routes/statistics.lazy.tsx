import { createLazyFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { usePokemonsOptions } from "@/hooks/use-pokemons";
import { Suspense, lazy } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { AlertCircle, ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Pokemon } from "@/types/pokemon.ts";
import { DataTablePaginable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { PokemonTypeBadge } from "@/components/ui/pokemon-type-badge";
import { useMonkeys } from "@/hooks/use-monkeys";
import { Monkey } from "@/types/monkey";
import { useTranslation } from "react-i18next";

const Alert = lazy(() =>
  import("@/components/ui/alert.tsx").then((module) => {
    return { default: module.Alert };
  })
);
const AlertDescription = lazy(() =>
  import("@/components/ui/alert.tsx").then((module) => {
    return { default: module.AlertDescription };
  })
);
const AlertTitle = lazy(() =>
  import("@/components/ui/alert.tsx").then((module) => {
    return { default: module.AlertTitle };
  })
);

export const Route = createLazyFileRoute("/statistics")({
  component: Statistics,
  pendingComponent: () => <LoadingSpinner />,
});

function Statistics() {
  const {
    data: pokemons,
    isFetching,
    error,
  } = useSuspenseQuery(usePokemonsOptions);
  const { data: monkeys } = useMonkeys();
  const { t } = useTranslation("common");

  const pokemonColumns: ColumnDef<Pokemon>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            #
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-start font-bold">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-start font-bold">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "hp",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("moncard.hp")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "attack",

      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("moncard.attack")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "defense",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("moncard.defense")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "specialAttack",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("moncard.specialAttack")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "specialDefense",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("moncard.specialDefense")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "speed",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("moncard.speed")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "types",
      header: t("moncard.type"),
      cell: ({ row }) => {
        return (
          <div className="flex flex-row justify-start items-start w-fit gap-x-2">
            {(row.getValue("types") as string[]).map((type) => (
              <PokemonTypeBadge type={type} key={type + row.getValue("id")} />
            ))}
          </div>
        );
      },
    },
  ];

  const monkeyColumns: ColumnDef<Monkey>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            #
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-start font-bold">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-start font-bold">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "hp",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("moncard.hp")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "attack",

      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("moncard.attack")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "defense",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("moncard.defense")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "specialAttack",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("moncard.specialAttack")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "specialDefense",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("moncard.specialDefense")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "speed",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("moncard.speed")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "types",
      header: t("moncard.type"),
      cell: ({ row }) => {
        return (
          <div className="flex flex-row justify-start items-start w-fit gap-x-2">
            {(row.getValue("types") as string[]).map((type) => (
              <PokemonTypeBadge type={type} key={type + row.getValue("id")} />
            ))}
          </div>
        );
      },
    },
  ];

  if (isFetching) {
    return (
      <div className="flex flex-col justify-center items-center min-w-80 sm:min-w-[500px] xl:min-w-[600px] min-h-[47rem] p-1">
        <LoadingSpinner />
      </div>
    );
  } else if (error) {
    import("sonner").then((module) =>
      module.toast.error(
        "Couldn't load data from MonkeyAPI. Maybe CORS isnt disabled in Browser or MonkeyAPI isnt running on localhost?"
      )
    );

    return (
      <Suspense>
        <div className="flex flex-col justify-center items-center min-w-80 sm:min-w-[500px] xl:min-w-[600px] p-1">
          <Alert variant="destructive" className="">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Couldn't load data from MonkeyAPI</AlertTitle>
            <AlertDescription>{`${error.message}. Maybe CORS isnt disabled in Browser or MonkeyAPI isnt running on localhost?`}</AlertDescription>
          </Alert>
        </div>
      </Suspense>
    );
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Pokemon</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTablePaginable
            columns={pokemonColumns}
            data={pokemons}
            filterkey="name"
            filterlabel="Pokemon"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Monkeys</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTablePaginable
            columns={monkeyColumns}
            data={monkeys ?? []}
            filterkey="name"
            filterlabel="Monkeys"
          />
        </CardContent>
      </Card>
    </div>
  );
}
