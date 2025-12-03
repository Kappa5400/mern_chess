import { Chessboard } from "react-chessboard";
import PropTypes from "prop-types";
import styles from "./Puzzlecard.module.css";

export default function PuzzleCard({ id, pgn }) {
  return (
    <div className={styles.puzzlecard}>
      <Chessboard
        id={id}
        position={pgn || "start"}
        boardWidth={220}
        arePiecesDraggable={false}
      />
    </div>
  );
}

PuzzleCard.propTypes = {
  fen: PropTypes.string,
};
