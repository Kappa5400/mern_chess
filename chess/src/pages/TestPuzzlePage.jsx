import React from "react";
import { SideBar } from "../components/sidebar.jsx";
import { UserProfile } from "../components/userprofile_test.jsx";
import styles from "./Index.module.css";
import { usePuzzleFetchHook } from "../hooks/useFetchPuzzleHook.js";
import { Chess } from "chess.js";
import { useParams } from "react-router-dom";
import { TestChessboardPuzzle } from "../components/test_chessboard_puzzle.jsx";

export function TestPuzzlePage() {
  const { id } = useParams();

  const { puzzle, isLoading, isError } = usePuzzleFetchHook(id);

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error</p>;

  let fen = "";

  try {
    const g = new Chess();
    g.loadPgn(puzzle.pgn);
    fen = String(g.fen());
  } catch {
    fen = "start";
  }

  console.log("Pgn: ", puzzle.pgn);
  console.log("Fen: ", fen);

  let whiteToMove = false;
  const pgn = puzzle.pgn;
  let moveCount = 0;
  for (let i = 0; i < pgn.length; i++) {
    if (pgn[i] == " ") {
      moveCount++;
    }
  }

  if (moveCount % 2 == 0) {
    whiteToMove = true;
  } else {
    whiteToMove = false;
  }

  return (
    <div className={styles.container}>
      <SideBar />
      <main className={styles.main}>
        <div className={styles.profileContainer}>
          <UserProfile />
        </div>
        <h1>Puzzle</h1>
        <h2>{whiteToMove ? "White to move" : "Black to move"}</h2>
        <div className={styles.puzzle}>
          <TestChessboardPuzzle
            key={puzzle._id}
            id={puzzle._id}
            fen={fen}
            answer={puzzle.answer}
          />
        </div>
      </main>
    </div>
  );
}
