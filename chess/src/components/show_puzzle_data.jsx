import React from "react";
import { useQuery } from "@tanstack/react-query";
import { get_all_Puzzle } from "../api/api_puzzle.js";
import { ShowPuzzle } from "./puzzle_list_text.jsx";

export function PuzzleContainer() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["puzzle"],
    queryFn: get_all_Puzzle,
  });

  console.log("Attempting to fetch puzzles from db...");

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading puzzles</p>;

  // Flatten in case data is nested arrays
  const puzzles = data?.flat() ?? [];

  console.log(`Fetched puzzle: ${puzzles}`);

  return <ShowPuzzle puzzles={puzzles} />;
}
