import { useState, useRef, useEffect } from "react";
import { Chess } from "chess.js";
import {
  Chessboard,
  ChessboardProvider,
  SparePiece,
  defaultPieces,
} from "react-chessboard";
import styles from "./chessboard_puzzle.module.css";
import { createUserPuzzle } from "../api/api_user_puzzle";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";

export function MakeUserPuzzleBoard() {
  // --- State Definitions ---
  // FENの各要素を管理するためのState
  const navigate = useNavigate();
  const [colorToMove, setColorToMove] = useState("w");
  const [whiteCastle, setWhiteCastle] = useState("KQ");
  const [blackCastle, setBlackCastle] = useState("kq");
  const [isEpEnabled, setIsEpEnabled] = useState("false"); // "true" or "false" (string for select)
  const [epSquare, setEpSquare] = useState("-");
  const [answerInput, setPuzzleAnswer] = useState("");
  const [puzzleRating, setPuzzleRating] = useState("");
  // eslint-disable-next-line
  const [token, setToken] = useAuth();

  //auth handle
  if (token) {
    // eslint-disable-next-line
    const { sub } = jwtDecode(token);
  }
  // Chess instance
  const chessGameRef = useRef(
    new Chess("8/8/8/8/8/8/8/8 w - - 0 1", {
      skipValidation: true,
    })
  );
  const chessGame = chessGameRef.current;

  // Board position state
  const [chessPosition, setChessPosition] = useState(chessGame.fen());
  const [squareWidth, setSquareWidth] = useState(null);

  // --- Helpers ---

  // 汎用的なFEN更新関数: 指定したインデックスのパーツだけ書き換える
  const updateFenPart = (index, newValue) => {
    const fenParts = chessGame.fen().split(" ");
    fenParts[index] = newValue;
    const newFen = fenParts.join(" ");

    // chess.jsとReact Stateの両方を更新
    try {
      chessGame.load(newFen);
      setChessPosition(newFen);
      // eslint-disable-next-line
    } catch (error) {
      console.error("Invalid FEN:", newFen);
    }
  };

  // --- Handlers ---

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColorToMove(newColor);

    // 手番が変わるとアンパッサンの有効段が変わるため、EPはリセットするのが安全です
    setIsEpEnabled("false");
    setEpSquare("-");

    // FEN更新 (Index 1: Active Color, Index 3: EP target reset to "-")
    const fenParts = chessGame.fen().split(" ");
    fenParts[1] = newColor;
    fenParts[3] = "-";
    const newFen = fenParts.join(" ");
    chessGame.load(newFen);
    setChessPosition(newFen);
  };

  const handleWhiteCastleChange = (e) => {
    const newWhite = e.target.value;
    setWhiteCastle(newWhite);

    // 現在の黒の権利と結合
    let newCastling = newWhite + blackCastle;
    if (newCastling === "") newCastling = "-";

    updateFenPart(2, newCastling);
  };

  const handleBlackCastleChange = (e) => {
    const newBlack = e.target.value;
    setBlackCastle(newBlack);

    // 現在の白の権利と結合
    let newCastling = whiteCastle + newBlack;
    if (newCastling === "") newCastling = "-";

    updateFenPart(2, newCastling);
  };

  const handleEnPassantToggle = (e) => {
    const enabled = e.target.value;
    setIsEpEnabled(enabled);

    if (enabled === "false") {
      setEpSquare("-");
      updateFenPart(3, "-");
    }
    // "true"にした直後はまだスクエア未定なのでFENは更新しないか、"-"のまま待機
  };

  const handleEpTargetChange = (e) => {
    const target = e.target.value;
    setEpSquare(target);
    updateFenPart(3, target);
  };

  const handlePuzzleRatingChange = (e) => {
    const target = e.target.value;
    if (target === "") {
      setPuzzleRating("");
      return;
    }

    if (!/^\d+$/.test(target)) return;

    const num = Number(target);
    if (num > 3000 || target < 0) {
      return;
    }
    setPuzzleRating(target);
  };

  const handlePuzzleAnswer = (e) => {
    const target = e.target.value;
    setPuzzleAnswer(target);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answerInput) return alert("Enter an answer");
    if (!puzzleRating) return alert("Rating is required");

    if (!token) {
      alert("You must be logged in to save puzzle.");
      return;
    }

    const payload = {
      fen: chessPosition,
      answer: answerInput,
      rating: Number(puzzleRating),
    };

    console.log("Submitting: ", payload);

    try {
      await createUserPuzzle(payload, token);
      alert("Puzzle saved to data base.");
      navigate("/");
    } catch (error) {
      console.log("Error submitting to database: ", error);
      alert("Error: couldn't save puzzle.");
    }
  };

  // --- Drag & Drop Logic ---

  useEffect(() => {
    const square = document
      .querySelector(`[data-column="a"][data-row="1"]`)
      ?.getBoundingClientRect();
    setSquareWidth(square?.width ?? null);
  }, []);

  function onPieceDrop({ sourceSquare, targetSquare, piece }) {
    const color = piece.pieceType[0];
    const type = piece.pieceType[1].toLowerCase();

    if (!targetSquare) {
      chessGame.remove(sourceSquare);
      setChessPosition(chessGame.fen());
      return true;
    }

    if (!piece.isSparePiece) {
      chessGame.remove(sourceSquare);
    }

    const success = chessGame.put({ color, type }, targetSquare);

    if (!success) {
      alert(
        `The board already contains a ${
          color === "w" ? "white" : "black"
        } King piece`
      );
      return false;
    }

    setChessPosition(chessGame.fen());
    return true;
  }

  // --- Render Helpers ---

  const blackPieceTypes = Object.keys(defaultPieces).filter(
    (p) => p[0] === "b"
  );
  const whitePieceTypes = Object.keys(defaultPieces).filter(
    (p) => p[0] === "w"
  );
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

  const chessboardOptions = {
    position: chessPosition,
    onPieceDrop,
    id: "spare-pieces",
  };

  return (
    <div className={styles.Puzzle}>
      <ChessboardProvider className={styles.Puzzle} options={chessboardOptions}>
        {/* Black Spares */}
        {squareWidth && (
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
        )}

        <Chessboard />

        {/* White Spares */}
        {squareWidth && (
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
        )}
      </ChessboardProvider>

      {/* --- Controls Form --- */}
      <div style={{ marginTop: "20px", fontFamily: "sans-serif" }}>
        {/* 1. Color to Move */}
        <div style={{ marginBottom: "10px" }}>
          <strong>Color to move: </strong>
          <label style={{ marginLeft: "10px" }}>
            <input
              type="radio"
              name="colorToMove"
              value="w"
              checked={colorToMove === "w"}
              onChange={handleColorChange}
            />
            White
          </label>
          <label style={{ marginLeft: "10px" }}>
            <input
              type="radio"
              name="colorToMove"
              value="b"
              checked={colorToMove === "b"}
              onChange={handleColorChange}
            />
            Black
          </label>
        </div>

        {/* 2. Castling Rights */}
        <div style={{ marginBottom: "10px" }}>
          <label>
            White Castle:
            <select
              value={whiteCastle}
              onChange={handleWhiteCastleChange}
              style={{ marginLeft: "5px", marginRight: "15px" }}
            >
              <option value="KQ">King & Queen (KQ)</option>
              <option value="K">King side (K)</option>
              <option value="Q">Queen side (Q)</option>
              <option value="">None</option>
            </select>
          </label>

          <label>
            Black Castle:
            <select
              value={blackCastle}
              onChange={handleBlackCastleChange}
              style={{ marginLeft: "5px" }}
            >
              <option value="kq">King & Queen (kq)</option>
              <option value="k">King side (k)</option>
              <option value="q">Queen side (q)</option>
              <option value="">None</option>
            </select>
          </label>
        </div>

        {/* 3. En Passant */}
        <div>
          <label>
            En Passant Available?
            <select
              value={isEpEnabled}
              onChange={handleEnPassantToggle}
              style={{ marginLeft: "5px" }}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </label>

          {/* 条件付きレンダリング: Yesの場合のみターゲット選択を表示 */}
          {isEpEnabled === "true" && (
            <label style={{ marginLeft: "15px" }}>
              Target Square:
              <select
                value={epSquare}
                onChange={handleEpTargetChange}
                style={{ marginLeft: "5px" }}
              >
                <option value="-">Select...</option>
                {files.map((file) => {
                  // White番なら相手(黒)が動いた直後なのでRank 6、Black番ならRank 3
                  const rank = colorToMove === "w" ? 6 : 3;
                  const sq = `${file}${rank}`;
                  return (
                    <option key={sq} value={sq}>
                      {sq}
                    </option>
                  );
                })}
              </select>
            </label>
          )}
        </div>
        <br />
        <form onSubmit={handleSubmit}>
          <label>
            Type answer pgn:
            <input
              type="text"
              value={answerInput}
              onChange={handlePuzzleAnswer}
            />
          </label>
          <br />
          <br />
          <label>
            Type puzzle rating:
            <input
              type="text"
              value={puzzleRating}
              onChange={handlePuzzleRatingChange}
            />
          </label>

          <br />
          <button type="submit">Submit Puzzle</button>
        </form>
        {/* Debug: 現在のFENを表示 (開発中のみ便利) */}
        <div
          style={{
            marginTop: "15px",
            padding: "10px",
            background: "#f0f0f0",
            fontSize: "0.8em",
            wordBreak: "break-all",
          }}
        >
          <strong>FEN:</strong> {chessPosition}
        </div>
      </div>
    </div>
  );
}

MakeUserPuzzleBoard.propTypes = {
  // 必要に応じて追加
};
