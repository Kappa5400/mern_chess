import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ChessboardWithPGN from "./ChessboardWithPGN.jsx";
import { get_puzzle_by_id } from "../api/api_puzzle.js";

export function PuzzlePage() {
  const { game_id } = useParams();
  const [pgn, setPGN] = useState(null);

  useEffect(() => {
    async function fetchPGN() {
      try {
        const res = await fetch(get_puzzle_by_id(game_id));
        const data = await res.json();
        setPGN(data.pgn);
      } catch (err) {
        console.error("Failed to get  pgn", err);
      }
    }
    fetchPGN();
  }, [game_id]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-2">Puzzle #{game_id}</h2>
      <ChessboardWithPGN pgn={pgn} />
    </div>
  );
}
