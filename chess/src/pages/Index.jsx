import React from "react";
import { SideBar } from "../components/sidebar.jsx";
import { ShowPuzzleText } from "../components/puzzle_list_text.jsx";
import { UserProfile } from "../components/userprofile_test.jsx";
import styles from "./Index.module.css";
import { ChessboardComponent } from "../components/chessboard_starting_pos.jsx";
import { useFetchAllPuzzles } from "../hooks/usePuzzleFetch Hook.js";

export function Index() {
  const puzzles = useFetchAllPuzzles();

  return (
    <div className={styles.container}>
      <SideBar />
      <main className={styles.main}>
        <div className={styles.profileContainer}>
          <UserProfile />
        </div>
        <h1>Chess Puzzle App</h1>
        <ChessboardComponent />
        <ShowPuzzleText puzzles={puzzles.puzzles} 
          isLoading={puzzles.isLoading}
          />
      </main>
    </div>
  );
}
