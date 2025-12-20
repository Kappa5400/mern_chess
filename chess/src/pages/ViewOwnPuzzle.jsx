import React from "react";
import { SideBar } from "../components/sidebar.jsx";
import { UserProfile } from "../components/userprofile_test.jsx";
import PuzzleCard from "../components/Puzzlecard.jsx";
import styles from "./PuzzleListPage.module.css";
import { useFetchAllOwnUserPuzzles } from "../hooks/useFetchAllOwnUserPuzzles.js";
import { Chess } from "chess.js";
import { useAuth } from "../contexts/AuthContext";

export function ViewOwnPuzzlePage() {
  const [token] = useAuth();

  const { puzzles, isLoading, isError } = useFetchAllOwnUserPuzzles(token);

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
            <PuzzleCard key={p._id} id={p._id} fen={p.fen} />
          ))}
        </div>
      </main>
    </div>
  );
}
