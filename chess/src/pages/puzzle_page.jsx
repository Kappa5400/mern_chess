import React from "react";
import { SideBar } from "../components/sidebar.jsx";
import { UserProfile } from "../components/userprofile_test.jsx";
import styles from "./Index.module.css";
import { usePuzzleFetchHook } from "../hooks/useFetchPuzzleHook.js";
import { Chess } from "chess.js";

export function PuzzlePage(id) {
  const { puzzle, isLoading, isError } = usePuzzleFetchHook(id);

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error</p>;

  const puzzleWithFen = puzzle.map((p) => {
    const fen = (() => {
      try {
        const g = new Chess();
        g.loadPgn(p.pgn);
        return String(g.fen());
      } catch {
        return "start";
      }
    })();
    return { ...p, fen };
  });

  console.log("puzzleWithFen: ", puzzleWithFen);

  console.log("Pgn: ", puzzleWithFen.pgn);
  console.log("Fen: ", puzzleWithFen.fen);

  return (
    <div className={styles.container}>
      <SideBar />
      <main className={styles.main}>
        <div className={styles.profileContainer}>
          <UserProfile />
        </div>
        <h1>Puzzle List</h1>
        <div className={styles.puzzle}>
          <chessboard_puzzle
            key={puzzleWithFen._id}
            id={puzzleWithFen._id}
            fen={puzzleWithFen.fen}
          />
        </div>
      </main>
    </div>
  );
}
