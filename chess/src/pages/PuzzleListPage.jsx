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

  const fen_list = puzzles.map((p) => {
    const fen = (() => {
      try {
        const g = new Chess();
        g.loadPgn(p.pgn);
        return String(g.fen());
      } catch {
        return "start";
      }
    })();
    return { ...p, fen };
  });

  console.log("Fen list: ", fen_list);

  //adjust length to puzzle amount in db
  for (let i = 0; i < 2; i++) {
    console.log("Loop debug pgn: ", fen_list[i].pgn);
    console.log("Fen: ", fen_list[i].fen);
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
          {fen_list.map((p) => (
            <PuzzleCard key={p._id} id={p._id} fen={p.fen} />
          ))}
        </div>
      </main>
    </div>
  );
}
