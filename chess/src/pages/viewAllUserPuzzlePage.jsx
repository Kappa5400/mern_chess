import React from "react";
import { SideBar } from "../components/sidebar.jsx";
import { UserProfile } from "../components/userprofile_test.jsx";
import PublicPuzzleCard from "../components/PublicPuzzleCard.jsx";
import styles from "./PuzzleListPage.module.css";
import { useFetchAllUserPuzzles } from "../hooks/useFetchAllUserPuzzleHook.js";
import { Chess } from "chess.js";

export function ViewAllUserPuzzlePage() {
  const { puzzles, isLoading, isError } = useFetchAllUserPuzzles();

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
            <PublicPuzzleCard key={p._id} id={p._id} fen={p.fen} />
          ))}
        </div>
      </main>
    </div>
  );
}
