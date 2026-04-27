import { Chessboard } from "react-chessboard";
import PropTypes from "prop-types";
import styles from "./chessboard_puzzle.module.css";
import { useRef, useState, useEffect } from "react";
import { Chess } from "chess.js";
import { useRaiseScore } from "../hooks/useRaiseScoreHook";

export function ChessboardPuzzle({
  // eslint-disable-next-line
  id,
  fen,
  whiteToMove,
  answer,
  onSolved,
  onWrongMove,
}) {
  const raiseScore = useRaiseScore();

  const [position, setPosition] = useState(fen);

  const gameRef = useRef(null);
  const movesRef = useRef([]);
  const moveIndexRef = useRef(0);
  const puzzleLenRef = useRef(0);

  useEffect(() => {
    const movesArray =
      typeof answer === "string"
        ? answer.trim().split(/\s+/).filter(Boolean)
        : answer;

    movesRef.current = movesArray.map((moveStr) => {
      const from = moveStr.slice(0, 2);
      const to = moveStr.slice(2, 4);
      const promote = moveStr.length > 4 ? moveStr[4] : undefined;
      return { from, to, promote };
    });

    puzzleLenRef.current = movesRef.current.length;
    moveIndexRef.current = 0;
    gameRef.current = new Chess(fen);
    setPosition(fen);
    // eslint-disable-next-line
  }, [fen, answer]);

  function onPieceDrop({ sourceSquare, targetSquare }) {
    const game = gameRef.current;
    const required = movesRef.current[moveIndexRef.current];
    if (!game || !required) return false;

    if (required.from !== sourceSquare || required.to !== targetSquare) {
      onWrongMove?.();
      return false;
    }

    game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: required.promote,
    });
    moveIndexRef.current += 1;
    setPosition(game.fen());

    if (moveIndexRef.current >= puzzleLenRef.current) {
      onSolved?.();
      raiseScore();
      return true;
    }

    setTimeout(() => {
      const cpu = movesRef.current[moveIndexRef.current];
      if (!cpu) return;
      game.move(cpu);
      moveIndexRef.current += 1;
      setPosition(game.fen());

      if (moveIndexRef.current >= puzzleLenRef.current) {
        onSolved?.();
        raiseScore();
      }
    }, 200);

    return true;
  }

  function canDragPiece({ piece }) {
    if (whiteToMove === true) {
      return piece.pieceType[0] === "w";
    }
    return piece.pieceType[0] === "b";
  }

  const chessboardOptions = {
    position: position,
    onPieceDrop: onPieceDrop,
    boardWidth: 700,
    canDragPiece,
    boardOrientation: whiteToMove ? "white" : "black",
  };

  return (
    <div className={styles.Puzzle}>
      <Chessboard options={chessboardOptions} />
    </div>
  );
}

ChessboardPuzzle.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fen: PropTypes.string.isRequired,
  answer: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  whiteToMove: PropTypes.bool.isRequired,
};
