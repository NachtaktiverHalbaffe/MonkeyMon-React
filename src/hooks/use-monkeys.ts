import { getAllMonkeys } from "@/api/monkeyapi.ts";
import { queryOptions, useQuery } from "@tanstack/react-query";

export function useMonkeys() {
  return useQuery({
    queryKey: ["monkeys"],
    queryFn: () => getAllMonkeys(),
    staleTime: Infinity,
  });
}

export const useMonkeysOptions = queryOptions({
  queryKey: ["monkeys"],
  queryFn: () => getAllMonkeys(),
  staleTime: Infinity,
});
