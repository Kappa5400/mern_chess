import { useEffect, useState } from "react";
import { Chessboard, ChessboardProvider, SparePiece, defaultPieces } from "react-chessboard";
import PropTypes from "prop-types";

export function PuzzleSetupBoard({ chessPosition, onPieceDrop }) {
  const [squareWidth, setSquareWidth] = useState(null);

  useEffect(() => {
    const square = document
      .querySelector(`[data-column="a"][data-row="1"]`)
      ?.getBoundingClientRect();
    setSquareWidth(square?.width ?? null);
  }, []);

  const blackPieceTypes = Object.keys(defaultPieces).filter((p) => p[0] === "b");
  const whitePieceTypes = Object.keys(defaultPieces).filter((p) => p[0] === "w");

  const chessboardOptions = {
    position: chessPosition,
    onPieceDrop,
    id: "spare-pieces",
  };

  return (
    <ChessboardProvider options={chessboardOptions}>
      {squareWidth && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", width: "fit-content", margin: "0 auto" }}>
          {blackPieceTypes.map((pieceType) => (
            <div key={pieceType} style={{ width: `${squareWidth}px`, height: `${squareWidth}px` }}>
              <SparePiece pieceType={pieceType} />
            </div>
          ))}
        </div>
      )}

      <Chessboard />

      {squareWidth && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", width: "fit-content", margin: "0 auto" }}>
          {whitePieceTypes.map((pieceType) => (
            <div key={pieceType} style={{ width: `${squareWidth}px`, height: `${squareWidth}px` }}>
              <SparePiece pieceType={pieceType} />
            </div>
          ))}
        </div>
      )}
    </ChessboardProvider>
  );
}

PuzzleSetupBoard.propTypes = {
  chessPosition: PropTypes.string.isRequired,
  onPieceDrop: PropTypes.func.isRequired,
};
