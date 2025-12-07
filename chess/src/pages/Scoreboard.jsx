import React from "react";
import { SideBar } from "../components/sidebar.jsx";
import { UserProfile } from "../components/userprofile_test.jsx";
import styles from "./Index.module.css";
import { ChessboardComponent } from "../components/chessboard_starting_pos.jsx";
import { useFetchTopUsers } from "../hooks/useFetchTopUsers.js";
import { TopUserChart } from "../components/TopUserChart.jsx";

export function Scoreboard() {
  const { topUsers, isLoading, isError } = useFetchTopUsers();

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error</p>;

  return (
    <div className={styles.container}>
      <SideBar />
      <main className={styles.main}>
        <div className={styles.profileContainer}>
          <UserProfile />
        </div>
        <h1>Scoreboard</h1>
        <br />
        {topUsers?.map((u) => (
          <TopUserChart key={u._id} user={u.username} score={u.score} />
        ))}
        <ChessboardComponent />
      </main>
    </div>
  );
}
