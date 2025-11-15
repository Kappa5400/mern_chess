import React from "react";
import { SideBar } from "../components/sidebar.jsx";
import { UserProfile } from "../components/userprofile_test.jsx";
import { ChessboardComponent } from "../components/chessboard_starting_pos.jsx";
import { PuzzleCard } from "../components/Puzzlecard.jsx";
import styles from "./PuzzleListPage.module.css";
import { useFetchAllPuzzles } from "../hooks/usePuzzleFetch Hook.js";
import { puzzle } from "../../backend/src/db/model/puzzle.js";

export function PuzzleListPage() {
  const { puzzles, isLoading } = useFetchAllPuzzles();

  if (isLoading) return <p>Loading</p>;

  const dateList = puzzles.map((p) => <li key={p.date}>{p.date}</li>);
  const pgnList = puzzles.map((p) => <li key={p.date}>{p.pgn}</li>);

  return (
    <div className={styles.container}>
      <SideBar />
      <main className={styles.main}>
        <div className={styles.profileContainer}>
          <UserProfile />
        </div>
        <hi>Puzzle List</hi>
        <PuzzleCard date={dateList} pfn={pgnList} />
      </main>
    </div>
  );
}
