import { Chessboard } from "react-chessboard";
import React from "react";
import PropTypes from "prop-types";
import styles from "./Puzzlecard.module.css";

export function PuzzleCard({ date, pgn }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{date}</h3>
      <div className={styles.boardContainer}>
        <Chessboard
          id={date}
          position={pgn}
          boardWidth={240}
          arePiecesDraggable={false}
        />
      </div>
    </div>
  );
}

PuzzleCard.propTypes = {
  date: PropTypes.string.isRequired,
  pgn: PropTypes.string.isRequired,
};
