import { Chessboard } from "react-chessboard";
import PropTypes from "prop-types";
import styles from "./chessboard_puzzle.module.css";
import { useRef, useState, useEffect } from "react";
import { Chess } from "chess.js";

export function TestChessboardPuzzle({ id, fen, whiteToMove, answer }) {
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [position, setPosition] = useState(fen);

  const gameRef = useRef(null);
  const movesRef = useRef([]);

  // 初期化 & 手順生成
  useEffect(() => {
    const game = new Chess(fen);

    // answer が文字列の場合は空白で分割
    const movesArray = typeof answer === "string" ? answer.split(" ") : answer;

    console.log("Ans: ", answer);

    movesRef.current = movesArray.map((moveStr) => {
      const from = moveStr.slice(0, 2);
      const to = moveStr.slice(2, 4);
      return { from, to };
    });

    gameRef.current = new Chess(fen);
    setPosition(fen);
    setCurrentMoveIndex(0);
  }, [fen, answer]);

  // 駒移動
  function onPieceDrop({ sourceSquare, targetSquare }) {
    const game = gameRef.current;
    const required = movesRef.current[currentMoveIndex];
    if (!game || !required) return false;

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
      setCurrentMoveIndex((i) => i + 2);
    }, 200);

    return true;
  }

  function canDragPiece({ piece }) {
    return piece.pieceType[0] === "w";
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
