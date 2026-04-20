import { Chessboard } from "react-chessboard";
import PropTypes from "prop-types";
import styles from "./chessboard_puzzle.module.css";
import { useRef, useState, useEffect } from "react";
import { Chess } from "chess.js";
import { logger } from "../../backend/src/utils/logger";

// eslint-disable-next-line
export function TestChessboardPuzzle({ id, fen, whiteToMove, answer }) {
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [position, setPosition] = useState(fen);

  const gameRef = useRef(null);
  const movesRef = useRef([]);
  let puzzleLen = (answer.length - 4) / 5 + 1;

  useEffect(() => {
    // eslint-disable-next-line
    const game = new Chess(fen);

    const movesArray = typeof answer === "string" ? answer.split(" ") : answer;

    const puzzleLen = movesArray.length;
    logger.log("White to move: ", whiteToMove);
    logger.log("Ans: ", movesArray);
    logger.log("Ans  len: ", puzzleLen);

    movesRef.current = movesArray.map((moveStr) => {
      const from = moveStr.slice(0, 2);
      const to = moveStr.slice(2, 4);
      return { from, to };
    });

    gameRef.current = new Chess(fen);
    setPosition(fen);
    setCurrentMoveIndex(0);
    // eslint-disable-next-line
  }, [fen, answer]);

  function onPieceDrop({ sourceSquare, targetSquare }) {
    const game = gameRef.current;
    const required = movesRef.current[currentMoveIndex];
    if (!game || !required) {
      logger.log("Win");
      return false;
    }

    if (required.from !== sourceSquare || required.to !== targetSquare)
      return false;

    game.move({ from: sourceSquare, to: targetSquare, promotion: "q" });
    setPosition(game.fen());
    setCurrentMoveIndex((i) => i + 1);

    setTimeout(() => {
      const cpu = movesRef.current[currentMoveIndex + 1];
      if (!cpu) return;
      game.move(cpu);
      setPosition(game.fen());
      setCurrentMoveIndex((i) => i + 1);
    }, 200);
    logger.log(currentMoveIndex);
    logger.log("Puzzle len: ", puzzleLen);
    if (currentMoveIndex == puzzleLen - 1) {
      logger.log("win");
    }

    return true;
  }

  function canDragPiece({ piece }) {
    if (whiteToMove == true) {
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

TestChessboardPuzzle.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fen: PropTypes.string.isRequired,
  answer: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  whiteToMove: PropTypes.bool.isRequired,
};
