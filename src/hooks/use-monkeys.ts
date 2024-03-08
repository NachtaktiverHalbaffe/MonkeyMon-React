import { getAllMonkeys } from "@/api/monkeyapi.ts";
import { useQuery } from "@tanstack/react-query";

export function useMonkeys() {
  return useQuery({
    queryKey: ["monkeys"],
    queryFn: () => getAllMonkeys(),
    staleTime: Infinity,
  });
}
