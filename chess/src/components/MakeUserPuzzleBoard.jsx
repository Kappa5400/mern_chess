import { Chessboard } from "react-chessboard";
import PropTypes from "prop-types";
import { useRef, useState, useEffect } from "react";
import { Chess } from "chess.js";
import {
  defaultPieces,
  ChessboardProvider,
  SparePiece,
} from "react-chessboard";
import styles from "./chessboard_puzzle.module.css";

export function MakeUserPuzzleBoard() {
  const chessGameRef = useRef(
    new Chess("8/8/8/8/8/8/8/8 w - - 0 1", {
      skipValidation: true,
    })
  );
  const chessGame = chessGameRef.current;

  // track the current position of the chess game in state to trigger a re-render of the chessboard
  const [chessPosition, setChessPosition] = useState(chessGame.fen());

  const [squareWidth, setSquareWidth] = useState(null);

  // get the width of a square to use for the spare piece sizes
  useEffect(() => {
    const square = document
      .querySelector(`[data-column="a"][data-row="1"]`)
      ?.getBoundingClientRect();
    setSquareWidth(square?.width ?? null);
  }, []);

  // handle piece drop
  function onPieceDrop({ sourceSquare, targetSquare, piece }) {
    const color = piece.pieceType[0];
    const type = piece.pieceType[1].toLowerCase();

    // if the piece is dropped off the board, we need to remove it from the board
    if (!targetSquare) {
      chessGame.remove(sourceSquare);
      setChessPosition(chessGame.fen());

      // successful drop off board
      return true;
    }

    // if the piece is not a spare piece, we need to remove it from it's original square
    if (!piece.isSparePiece) {
      chessGame.remove(sourceSquare);
    }

    // try to place the piece on the board
    const success = chessGame.put(
      {
        color: color,
        type: type,
      },
      targetSquare
    );

    // show error message if cannot place another king
    if (!success) {
      alert(
        `The board already contains a ${
          color === "w" ? "white" : "black"
        } King piece`
      );
      return false;
    }

    // update the game state and return true if successful
    setChessPosition(chessGame.fen());
    return true;
  }

  // get the piece types for the black and white spare pieces
  const blackPieceTypes = [];
  const whitePieceTypes = [];

  for (const pieceType of Object.keys(defaultPieces)) {
    if (pieceType[0] === "b") {
      blackPieceTypes.push(pieceType);
    } else {
      whitePieceTypes.push(pieceType);
    }
  }

  // set the chessboard options
  const chessboardOptions = {
    position: chessPosition,
    onPieceDrop,
    id: "spare-pieces",
  };

  return (
    <div className={styles.Puzzle}>
      <ChessboardProvider className={styles.Puzzle} options={chessboardOptions}>
        {squareWidth ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              width: "fit-content",
              margin: "0 auto",
            }}
          >
            {blackPieceTypes.map((pieceType) => (
              <div
                key={pieceType}
                style={{
                  width: `${squareWidth}px`,
                  height: `${squareWidth}px`,
                }}
              >
                <SparePiece pieceType={pieceType} />
              </div>
            ))}
          </div>
        ) : null}

        <Chessboard />

        {squareWidth ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              width: "fit-content",
              margin: "0 auto",
            }}
          >
            {whitePieceTypes.map((pieceType) => (
              <div
                key={pieceType}
                style={{
                  width: `${squareWidth}px`,
                  height: `${squareWidth}px`,
                }}
              >
                <SparePiece pieceType={pieceType} />
              </div>
            ))}
          </div>
        ) : null}
      </ChessboardProvider>
    </div>
  );
}

MakeUserPuzzleBoard.propTypes = {
  fen: PropTypes.string.isRequired,
  answer: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  whiteToMove: PropTypes.bool.isRequired,
};
