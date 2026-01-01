import { useQuery } from "@tanstack/react-query";
import { getAllPuzzle } from "../api/api_puzzle";

export function useFetchAllPuzzles() {
  const puzzlesQuery = useQuery({
    queryKey: ["AllPuzzles"],
    queryFn: getAllPuzzle,
    staleTime: 0,
    gcTime: 0,
  });

  const data = puzzlesQuery.data ?? [];

  const puzzles = Array.isArray(data)
    ? Array.isArray(data[0])
      ? data[0]
      : data
    : [];

  return {
    puzzles,
    isLoading: puzzlesQuery.isLoading,
    isError: puzzlesQuery.isError,
    error: puzzlesQuery.error,
  };
}
