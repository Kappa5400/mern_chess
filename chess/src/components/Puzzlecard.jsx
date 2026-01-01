import { Chessboard } from "react-chessboard";
import PropTypes from "prop-types";
import styles from "./Puzzlecard.module.css";
import { useNavigate } from "react-router-dom";

export default function PuzzleCard({ id, fen }) {
  const navigate = useNavigate();

  const chessboardOptions = {
    position: fen,
    id: id,
    boardWidth: 220,
    arePiecesDraggable: false,
    showAnimations: false,
  };

  return (
    <div
      className={styles.puzzlecard}
      onClick={() => navigate(`/puzzle/${id}`)}
      key={id}
    >
      <Chessboard options={chessboardOptions} key={id} />
    </div>
  );
}

PuzzleCard.propTypes = {
  fen: PropTypes.string,
};
