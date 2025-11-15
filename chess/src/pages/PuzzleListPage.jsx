import React from "react";
import { SideBar } from "../components/sidebar.jsx";
import { UserProfile } from "../components/userprofile_test.jsx";
import { ChessboardComponent } from "../components/chessboard_starting_pos.jsx";
import { PuzzleCard } from "../components/Puzzlecard.jsx";
import styles from "./PuzzleListPage.module.css";
import { get_all_Puzzle } from "../api/api_puzzle.js";

//const fetched_puzzle = await fetch(get_all_Puzzle());

export function PuzzleListPage() {
  return (
    <div>
      <PuzzleCard date="1/2/1997" pgn="E4" />
    </div>
  );
}
