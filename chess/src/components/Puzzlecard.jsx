import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import PropTypes from "prop-types";
import { Chess } from "chess.js";
import styles from "./Puzzlecard.module.css";
import { parse } from "@mliebelt/pgn-parser";

export default function PuzzleCard({ pgn }) {
  const [pos, setPos] = useState("start");

  useEffect(() => {
    if (!pgn) return;

    const game = new Chess();

    // PGNを構文解析（オプション、デバッグ用）
    try {
      const parsed = parse(pgn);
      console.log("Parsed PGN:", parsed);
    } catch (err) {
      console.warn("Failed to parse PGN with parser:", err);
    }

    // chess.js に PGN をロード
    const ok = game.loadPgn(pgn);

    console.log("Load PGN RESULT:", ok);

    if (ok) setPos(game.fen());
    else console.warn("FAILED to load PGN:", pgn);
  }, [pgn]);

  if (!pos) return <div className={styles.puzzlecard}>Loading</div>;

  return (
    <div className={styles.puzzlecard}>
      <Chessboard position={pos} boardWidth={220} arePiecesDraggable={false} />
    </div>
  );
}

PuzzleCard.propTypes = {
  date: PropTypes.string,
  pgn: PropTypes.string.isRequired,
  rating: PropTypes.number,
  answer: PropTypes.string,
};
