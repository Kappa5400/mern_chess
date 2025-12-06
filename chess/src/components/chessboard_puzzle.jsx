import { Chessboard } from "react-chessboard";
import PropTypes from "prop-types";
import styles from "./chessboard_puzzle.module.css";

export function ChessboardPuzzle({ id, fen }) {
  console.log("Fen inside component: ", fen);
  const chessboardOptions = {
    position: fen,
    id: id,
    boardWidth: 700,
    arePiecesDraggable: true,
    showAnimations: true,
  };
  return (
    <div className={styles.Puzzle}>
      <Chessboard options={chessboardOptions} />
    </div>
  );
}

ChessboardPuzzle.propTypes = {
  fen: PropTypes.string,
};
