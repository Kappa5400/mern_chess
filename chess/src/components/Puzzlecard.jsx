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
    game.loadPgn(pgn);
    setPos(game.fen());
  }, [pgn]);

  return (
    <div className={styles.puzzlecard}>
      <Chessboard position={pos} boardWidth={220} arePiecesDraggable={false} />
    </div>
  );
}

PuzzleCard.propTypes = {
  date: PropTypes.string.isRequired,
  pgn: PropTypes.string.isRequired,
  rating: PropTypes.number,
  answer: PropTypes.string,
};
