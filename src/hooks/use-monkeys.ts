import { useQuery } from "@tanstack/react-query";
import { getAllMonkeys } from "@/api/monkeyapi";

export function useMonkeys() {
  return useQuery({
    queryKey: ["monkeys"],
    queryFn: () => getAllMonkeys(),
    staleTime: Infinity,
  });
}
