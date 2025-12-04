import { Chessboard } from "react-chessboard";
import PropTypes from "prop-types";
import styles from "./Puzzlecard.module.css";

export default function PuzzleCard({ id, fen }) {
  return (
    <div className={styles.puzzlecard}>
      <Chessboard
        id={id}
        position={fen}
        boardWidth={220}
        arePiecesDraggable={false}
      />
    </div>
  );
}

PuzzleCard.propTypes = {
  fen: PropTypes.string,
};
