import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SideBar } from "../components/sidebar.jsx";
import { PuzzleContainer } from "../components/puzzle_container_all.jsx";
import { UserProfile } from "../components/userprofile_test.jsx";
import styles from "./Index.module.css";
import { ChessboardComponent } from "../components/chessboard_starting_pos.jsx";

const queryClient = new QueryClient();

export function Index() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.container}>
        <SideBar />
        <main className={styles.main}>
          <div className={styles.profileContainer}>
            <UserProfile />
          </div>
          <h1>Chess Puzzle App</h1>
          <ChessboardComponent />
          <PuzzleContainer />
        </main>
      </div>
    </QueryClientProvider>
  );
}
