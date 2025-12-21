import React from "react";
import { SideBar } from "../components/sidebar.jsx";
import { UserProfile } from "../components/userprofile_test.jsx";
import UserPuzzleCard from "../components/userPuzzleCard.jsx";
import styles from "./PuzzleListPage.module.css";
import { useFetchAllOwnuserPuzzles } from "../hooks/useFetchAllOwnUserPuzzles.js";
import { Chess } from "chess.js";
import { useAuth } from "../contexts/AuthContext";

export function ViewOwnPuzzlePage() {
  const [token] = useAuth();

  const { puzzles, isLoading, isError } = useFetchAllOwnuserPuzzles();

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error</p>;

  if (!token) {
    return (
      <div className={styles.container}>
        <SideBar />
        <h1>You must be logged in to use this feature.</h1>
      </div>
    );
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
            <UserPuzzleCard key={p._id} id={p._id} fen={p.fen} />
          ))}
        </div>
      </main>
    </div>
  );
}
