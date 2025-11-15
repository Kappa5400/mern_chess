import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import PropTypes from "prop-types";
import { Chess } from "chess.js";
import styles from "./Puzzlecard.module.css";

export default function PuzzleCard({ pgn }) {
  const [pos, setPos] = useState("start");

  useEffect(() => {
    if (!pgn) return;
    const game = new Chess();
    const loaded = game.loadPgn(pgn);
    if (loaded) setPos(game.fen());
    else console.warn("Failed to read PGN:", pgn);
  }, [pgn]);

  if (!pos) return <div className={styles.puzzlecard}>Loading</div>;

  return (
    <div className={styles.puzzlecard}>
      <Chessboard position={pos} boardWidth={220} arePiecesDraggable={false} />
    </div>
  );
}

PuzzleCard.propTypes = {
  date: PropTypes.string,
  pgn: PropTypes.string.isRequired,
  rating: PropTypes.number,
  answer: PropTypes.string,
};
