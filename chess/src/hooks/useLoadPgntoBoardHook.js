import { useQuery } from "@tanstack/react-query";
import { get_puzzle_by_id } from "../api/api_puzzle";
import { Chess } from "chess.js";

export function useLoadPGNtoBoard(p_id) {
  const puzzleQuery = useQuery({
    queryKey: ["puzzle"],
    queryFn: () => get_puzzle_by_id(p_id),
  });

  const res = puzzleQuery.data ?? null;

  //logging
  console.log(`Fetched puzzle from hook loadpgntoboard:`, JSON.stringify(res));

  let game = null;
  if (res?.pgn) {
    const g = new Chess();
    g.loadPgn(res.pgn, {sloppy: true});
    game = g;
  }

  return {
    res,
    game,
    isLoading: puzzleQuery.isLoading,
    isError: puzzleQuery.isError,
    error: puzzleQuery.error,
  };
}
