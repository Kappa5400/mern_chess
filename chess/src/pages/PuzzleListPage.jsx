import React from "react";
import { SideBar } from "../components/sidebar.jsx";
import { UserProfile } from "../components/userprofile_test.jsx";
import PuzzleCard from "../components/Puzzlecard.jsx";
import styles from "./PuzzleListPage.module.css";
import { useFetchAllPuzzles } from "../hooks/useFetchAllHook.js";
import { Chess } from "chess.js";

export function PuzzleListPage() {
  const { puzzles, isLoading, isError } = useFetchAllPuzzles();

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error</p>;

  for (let i = 0; i < 3; i++) {
    console.log("Loop debug: ", puzzles[i].pgn);
  }

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
            <PuzzleCard key={p._id} id={p._id} pgn={p.pgn} />
          ))}
        </div>
      </main>
    </div>
  );
}
