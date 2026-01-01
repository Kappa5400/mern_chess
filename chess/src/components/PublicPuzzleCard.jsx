import { Chessboard } from "react-chessboard";
import PropTypes from "prop-types";
import styles from "./Puzzlecard.module.css";
import { useNavigate } from "react-router-dom";

export default function PublicPuzzleCard({ id, fen }) {
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
      onClick={() => navigate(`/ViewPublicUserPuzzle/${id}`)}
      key={id}
    >
      <Chessboard options={chessboardOptions} />
    </div>
  );
}

PublicPuzzleCard.propTypes = {
  fen: PropTypes.string,
};
