import React from "react";
import { SideBar } from "../components/sidebar.jsx";
import { ShowPuzzleText } from "../components/puzzle_list_text.jsx";
import { UserProfile } from "../components/userprofile_test.jsx";
import styles from "./Index.module.css";
import { ChessboardComponent } from "../components/chessboard_starting_pos.jsx";
import { get_all_Puzzle } from "../api/api_puzzle.js";
import { useQuery } from "@tanstack/react-query";

export function Index() {
  const puzzlesQuery = useQuery({
    queryKey: ["puzzles"],
    queryFn: get_all_Puzzle,
  });

  const puzzles = puzzlesQuery.data?.[0] ?? [];

  if (puzzlesQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-indigo-600">
        Loading puzzle data...
      </div>
    );
  }

  const jsonPuzzles = JSON.stringify(puzzles);

  console.log(`Puzzle data: ${jsonPuzzles}`);

  return (
    <div className={styles.container}>
      <SideBar />
      <main className={styles.main}>
        <div className={styles.profileContainer}>
          <UserProfile />
        </div>
        <h1>Chess Puzzle App</h1>
        <ChessboardComponent />
        <ShowPuzzleText puzzles={puzzles} />
      </main>
    </div>
  );
}
