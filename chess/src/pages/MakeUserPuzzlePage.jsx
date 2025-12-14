import React from "react";
import { SideBar } from "../components/sidebar.jsx";
import { UserProfile } from "../components/userprofile_test.jsx";
import styles from "./Index.module.css";
import { Chess } from "chess.js";
import { MakeUserPuzzleBoard } from "../components/MakeUserPuzzleBoard.jsx";

export function MakeUserPuzzlePage() {
  return (
    <div className={styles.container}>
      <SideBar />
      <main className={styles.main}>
        <div className={styles.profileContainer}>
          <UserProfile />
        </div>
        <h1>Make a puzzle</h1>

        <div className={styles.puzzle}>
          <MakeUserPuzzleBoard />
        </div>
      </main>
    </div>
  );
}
