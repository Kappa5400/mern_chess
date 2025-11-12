import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ChessboardWithPGN from "../components/chessboard_puzzle.jsx";
import { get_puzzle_by_id } from "../api/api_puzzle.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SideBar } from "../components/sidebar.jsx";
import { UserProfile } from "../components/userprofile_test.jsx";
import styles from "./Index.module.css";


export function PuzzlePage() {
  const { game_id } = useParams();
  const [pgn, setPGN] = useState(null);

  useEffect(() => {
    async function fetchPGN() {
      try {
        const res = await fetch(get_puzzle_by_id(game_id));
        const data = await res.json();
        setPGN(data.pgn);
      } catch (err) {
        console.error("Failed to get  pgn", err);
      }
    }
    fetchPGN();
  }, [game_id]);

  return (
    <div className={styles.container}>
      <SideBar />
      <main className={styles.main}>
        <div className={styles.profileContainer}>
          <UserProfile />
        </div>
        <h2 className="text-xl font-bold mb-2">Puzzle #{game_id}</h2>
        <div styles={{ maxWidth: "500px", margin: "0 auto" }}>
          <ChessboardWithPGN pgn={pgn} />
        </div>
      </main>
    </div>
  );
}
