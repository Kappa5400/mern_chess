import { Chessboard } from "react-chessboard";
import PropTypes from "prop-types";
import styles from "./chessboard_puzzle.module.css";

export function ChessboardPuzzle({ id, fen, onPieceDrop, whiteToMove }) {
  console.log("Fen inside component: ", fen);

  const chessboardOptions = {
    id: id,
    position: fen,
    onPieceDrop: onPieceDrop,
    boardWidth: 700,
    showAnimations: true,
    boardOrientation: whiteToMove ? "white" : "black",
    isDraggablePiece: ({ piece }) => piece.startsWith(whiteToMove ? "w" : "b"),
  };
  return (
    <div className={styles.Puzzle}>
      <Chessboard options={chessboardOptions} />
    </div>
  );
}

ChessboardPuzzle.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fen: PropTypes.string,
  onPieceDrop: PropTypes.func,
  whiteToMove: PropTypes.bool.isRequired,
};
