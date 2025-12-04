import { Chessboard } from "react-chessboard";
import PropTypes from "prop-types";
import styles from "./Puzzlecard.module.css";

export default function PuzzleCard({ id, fen }) {
  console.log("Fen inside card component: ", fen);
  const chessboardOptions = {
    position: fen,
    id: id,
    boardWidth: 220,
    arePiecesDraggable: false,
    showAnimations: false,
  };
  return (
    <div className={styles.puzzlecard}>
      <Chessboard options={chessboardOptions} />
    </div>
  );
}

PuzzleCard.propTypes = {
  fen: PropTypes.string,
};
