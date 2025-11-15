import React from "react";
import { SideBar } from "../components/sidebar.jsx";
import { UserProfile } from "../components/userprofile_test.jsx";
import { ChessboardComponent } from "../components/chessboard_starting_pos.jsx";
import PuzzleCard from "../components/Puzzlecard.jsx";
import styles from "./PuzzleListPage.module.css";
import { useFetchAllPuzzles } from "../hooks/usePuzzleFetch Hook.js";

export function PuzzleListPage() {
  const { puzzles, isLoading, isError } = useFetchAllPuzzles();

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error</p>;

  return (
    <div className={styles.container}>
      <SideBar />
      <main className={styles.main}>
        <div className={styles.profileContainer}>
          <UserProfile />
        </div>
        <h1>Puzzle List</h1>

        <div className={styles.puzzleGrid}>
          {puzzles.map((p) => (
            <PuzzleCard
              key={p._id}
              date={p.date}
              pgn={p.pgn}
              rating={p.rating}
              answer={p.answer}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
