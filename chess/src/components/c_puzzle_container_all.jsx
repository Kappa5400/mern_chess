import React from "react";
import { useQuery } from "@tanstack/react-query";
import { get_all_Puzzle } from "../api/api_puzzle.js";
import { ShowPuzzle } from "./c_puzzle.jsx";

export function PuzzleContainer() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["puzzle"],
    queryFn: get_all_Puzzle,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading puzzles</p>;

  // Flatten in case data is nested arrays
  const puzzles = data?.flat() ?? [];

  return <ShowPuzzle puzzles={puzzles} />;
}
