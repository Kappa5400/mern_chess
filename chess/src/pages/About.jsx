import React from "react";
import { SideBar } from "../components/sidebar.jsx";
import { UserProfile } from "../components/userprofile_test.jsx";
import styles from "./Index.module.css";
import { ChessboardComponent } from "../components/chessboard_starting_pos.jsx";

export function About() {
  return (
    <div className={styles.container}>
      <SideBar />
      <main className={styles.main}>
        <div className={styles.profileContainer}>
          <UserProfile />
        </div>
        <h1>About Page</h1>
        <br />
        <div>About text here.</div>
        <br />
        <ChessboardComponent />
      </main>
    </div>
  );
}
