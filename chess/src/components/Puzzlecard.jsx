import { useMemo } from "react";
import { Chessboard } from "react-chessboard";
import PropTypes from "prop-types";
import { Chess } from "chess.js";
import styles from "./Puzzlecard.module.css";

export default function PuzzleCard({ id, pgn }) {
  const position = useMemo(() => {
    if (!pgn) return "start";

    try {
      const game = new Chess();
      game.loadPgn(pgn);
      console.log("Fen from card component: ", game.fen());
      return game.fen();
    } catch (error) {
      console.error("Invalid PGN provided:", error);
      return "start";
    }
  }, [pgn]);

  return (
    <div className={styles.puzzlecard}>
      <Chessboard
        id={id}
        key={position}
        position={position}
        boardWidth={220}
        arePiecesDraggable={false}
      />
    </div>
  );
}

PuzzleCard.propTypes = {
  pgn: PropTypes.string,
};
