import { Chessboard } from "react-chessboard";
import PropTypes from "prop-types";
import styles from "./chessboard_puzzle.module.css";

export default function Puzzle({ id, fen }) {
  console.log("Fen inside component: ", fen);
  const chessboardOptions = {
    position: fen,
    id: id,
    boardWidth: 220,
    arePiecesDraggable: false,
    showAnimations: false,
  };
  return (
    <div className={styles.Puzzle}>
      <Chessboard options={chessboardOptions} />
    </div>
  );
}

Puzzle.propTypes = {
  fen: PropTypes.string,
};
