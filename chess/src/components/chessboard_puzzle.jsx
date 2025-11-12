import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

export default function ChessboardWithPGN({ pgn }) {
  const [game, setGame] = useState(new Chess());

  useEffect(() => {
    const g = new Chess();
    if (pgn) g.loadPgn(pgn);
    setGame(g);
  }, [pgn]);

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <Chessboard position={game.fen()} />;
    </div>
  );
}
