import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import PropTypes from "prop-types";
import { Chess } from "chess.js";
import styles from "./Puzzlecard.module.css";

export default function PuzzleCard({ pgn }) {
  const [pos, setPos] = useState(null);

  console.log("PGN in component: ", pgn);

  useEffect(() => {
    if (!pgn) return console.log("No pgn");

    const game = new Chess();
    game.loadPgn(pgn);
    const fen = game.fen();

    console.log("PGN->FEN: ", fen);

    if (fen) setPos(fen);
    else console.warn("Error loading PGN");
  }, [pgn]);

  if (pos === null) return <div>Loading</div>;

  return (
    <div className={styles.puzzlecard}>
      <Chessboard position={pos} boardWidth={220} arePiecesDraggable={false} />
    </div>
  );
}

PuzzleCard.propTypes = {
  pgn: PropTypes.string.isRequired,
};
