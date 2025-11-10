import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SideBar } from "./components/c_sidebar.jsx";
import { PuzzleContainer } from "./components/c_puzzle_container_all.jsx";
import { UserProfile } from "./components/c_userprofile.jsx";
import styles from "./App.module.css";
import { ChessboardComponent } from "./components/c_chessboard.jsx";

const queryClient = new QueryClient();

export function App() {
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
