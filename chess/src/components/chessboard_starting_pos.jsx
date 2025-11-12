import React from "react";
import { Chessboard } from "react-chessboard";

export function ChessboardComponent({ position = "start" }) {
  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <Chessboard position={position} />
    </div>
  );
}
