import React from "react";
import { SideBar } from "../components/sidebar.jsx";
import { UserProfile } from "../components/userprofile_test.jsx";
import styles from "./Index.module.css";
import { useUserPuzzleFetchHook } from "../hooks/useFetchUserPuzzleHook.js";
import { Chess } from "chess.js";
import { useParams } from "react-router-dom";
import { ChessboardPuzzle } from "../components/chessboard_puzzle.jsx";
import { useState } from "react";

export function UserPuzzlePage() {
  const { id } = useParams();
  const { puzzle, isLoading, isError } = useUserPuzzleFetchHook(id);

  const [solved, setSolved] = useState(false);
  const [wrongMove, setWrongMove] = useState(false);

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
    whiteToMove = false;
  } else {
    whiteToMove = true;
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
        <h1>
          {solved && wrongMove ? "Complete! Plus one point!" : ""}
          {solved && !wrongMove ? "Complete! Plus one point!" : ""}
          {wrongMove && !solved ? "Try another move." : ""}
        </h1>

        <div className={styles.puzzle}>
          <ChessboardPuzzle
            key={puzzle._id}
            id={puzzle._id}
            fen={fen}
            whiteToMove={whiteToMove}
            answer={puzzle.answer}
            onSolved={() => setSolved(true)}
            onWrongMove={() => setWrongMove(true)}
          />
        </div>
      </main>
    </div>
  );
}
