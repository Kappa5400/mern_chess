import React from "react";
import { SideBar } from "../components/sidebar.jsx";
import { UserProfile } from "../components/userprofile_test.jsx";
import styles from "./Index.module.css";
import { Chess } from "chess.js";
import { useParams } from "react-router-dom";
import { ChessboardPuzzle } from "../components/chessboard_puzzle.jsx";
import { useState } from "react";
import { useFetchPublicPuzzleHook } from "../hooks/useFetchPublicPuzzleHook.js";

export function ViewPublicPuzzle() {
  const { id } = useParams();
  const { puzzle, isLoading, isError } = useFetchPublicPuzzleHook(id);

  const [solved, setSolved] = useState(false);
  const [wrongMove, setWrongMove] = useState(false);

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error</p>;

  let whiteToMove = true;

  // who to move logic fen
  let puzzle_fen_color = puzzle.fen.split(" ")[1];
  if (puzzle_fen_color == "w") {
    whiteToMove = true;
  } else whiteToMove = false;

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
            fen={puzzle.fen}
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
