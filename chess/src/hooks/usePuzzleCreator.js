import { useState, useRef } from "react";
import { Chess } from "chess.js";
import { createUserPuzzle } from "../api/api_user_puzzle";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function usePuzzleCreator() {
  const navigate = useNavigate();
  const [token] = useAuth();

  // ─── Phase ───────────────────────────────────────────────────────────────────
  const [phase, setPhase] = useState("setup"); // "setup" | "record"

  // ─── Setup state ─────────────────────────────────────────────────────────────
  const [colorToMove, setColorToMove] = useState("w");
  const [whiteCastle, setWhiteCastle] = useState("KQ");
  const [blackCastle, setBlackCastle] = useState("kq");
  const [isEpEnabled, setIsEpEnabled] = useState("false");
  const [epSquare, setEpSquare] = useState("-");

  // ─── Record state ─────────────────────────────────────────────────────────────
  const [recordedMoves, setRecordedMoves] = useState([]);
  const [answerInput, setPuzzleAnswer] = useState("");

  // ─── Submit state ─────────────────────────────────────────────────────────────
  const [puzzleRating, setPuzzleRating] = useState("");
  const [err, setErr] = useState("");

  // ─── Refs ─────────────────────────────────────────────────────────────────────
  const chessGameRef = useRef(
    new Chess("8/8/8/8/8/8/8/8 w - - 0 1", { skipValidation: true }),
  );
  const chessGame = chessGameRef.current;
  const [chessPosition, setChessPosition] = useState(chessGame.fen());

  const recordGameRef = useRef(null);
  const lockedFenRef = useRef(null);

  // ─── FEN helper ───────────────────────────────────────────────────────────────
  const updateFenPart = (index, newValue) => {
    const fenParts = chessGame.fen().split(" ");
    fenParts[index] = newValue;
    const newFen = fenParts.join(" ");
    try {
      chessGame.load(newFen);
      setChessPosition(newFen);
    } catch {
      setErr("Invalid FEN generated — check your settings.");
    }
  };

  // ─── Setup handlers ───────────────────────────────────────────────────────────
  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColorToMove(newColor);
    setIsEpEnabled("false");
    setEpSquare("-");
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
    let newCastling = newWhite + blackCastle;
    if (newCastling === "") newCastling = "-";
    updateFenPart(2, newCastling);
  };

  const handleBlackCastleChange = (e) => {
    const newBlack = e.target.value;
    setBlackCastle(newBlack);
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
  };

  const handleEpTargetChange = (e) => {
    setEpSquare(e.target.value);
    updateFenPart(3, e.target.value);
  };

  function onSetupPieceDrop({ sourceSquare, targetSquare, piece }) {
    setErr("");
    const color = piece.pieceType[0];
    const type = piece.pieceType[1].toLowerCase();

    if (!targetSquare) {
      chessGame.remove(sourceSquare);
      setChessPosition(chessGame.fen());
      return true;
    }
    if (!piece.isSparePiece) chessGame.remove(sourceSquare);

    const success = chessGame.put({ color, type }, targetSquare);
    if (!success) {
      setErr(
        `The board already contains a ${color === "w" ? "white" : "black"} King piece`,
      );
      return false;
    }
    setChessPosition(chessGame.fen());
    return true;
  }

  // ─── Phase transition handlers ────────────────────────────────────────────────
  const handleLock = () => {
    const pieces = chessPosition.split(" ")[0];
    if (pieces === "8/8/8/8/8/8/8/8") {
      setErr("Place pieces on the board first.");
      return;
    }
    try {
      recordGameRef.current = new Chess(chessPosition);
    } catch {
      setErr("Invalid board position — check that both kings are placed.");
      return;
    }
    lockedFenRef.current = chessPosition;
    setRecordedMoves([]);
    setPuzzleAnswer("");
    setPhase("record");
    setErr("");
  };

  const handleBackToSetup = () => {
    if (lockedFenRef.current) {
      chessGame.load(lockedFenRef.current);
      setChessPosition(lockedFenRef.current);
    }
    setPhase("setup");
    setErr("");
  };

  const handleReset = () => {
    chessGameRef.current = new Chess("8/8/8/8/8/8/8/8 w - - 0 1", {
      skipValidation: true,
    });
    setChessPosition(chessGameRef.current.fen());
    setRecordedMoves([]);
    setPuzzleAnswer("");
    setPhase("setup");
    setErr("");
    setColorToMove("w");
    setWhiteCastle("KQ");
    setBlackCastle("kq");
    setIsEpEnabled("false");
    setEpSquare("-");
  };

  // ─── Record handlers ──────────────────────────────────────────────────────────
  function onRecordDrop({ sourceSquare, targetSquare }) {
    const game = recordGameRef.current;
    if (!game) return false;

    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      // add promotion handler here
      promotion: "q",
    });
    if (!move) {
      setErr("Illegal move.");
      return false;
    }

    setErr("");
    const uci = move.from + move.to + (move.promotion || "");
    const newMoves = [...recordedMoves, uci];
    setRecordedMoves(newMoves);
    setPuzzleAnswer(newMoves.join(" "));
    setChessPosition(game.fen());
    return true;
  }

  const handleUndo = () => {
    const game = recordGameRef.current;
    if (!game || recordedMoves.length === 0) return;
    game.undo();
    const newMoves = recordedMoves.slice(0, -1);
    setRecordedMoves(newMoves);
    setPuzzleAnswer(newMoves.join(" "));
    setChessPosition(game.fen());
    setErr("");
  };

  // ─── Submit ───────────────────────────────────────────────────────────────────
  const handlePuzzleRatingChange = (e) => {
    const target = e.target.value;
    if (target === "") {
      setPuzzleRating("");
      return;
    }
    if (!/^\d+$/.test(target)) return;
    const num = Number(target);
    if (num > 3000 || num < 0) return;
    setPuzzleRating(target);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!answerInput) {
      setErr("Need to solve the puzzle first.");
      return;
    }
    if (!puzzleRating) {
      setErr("Rating is required.");
      return;
    }
    if (!token) {
      setErr("You must be logged in to save a puzzle.");
      return;
    }

    const puzzleStartFen = lockedFenRef.current;

    try {
      await createUserPuzzle(
        {
          fen: puzzleStartFen,
          answer: answerInput,
          rating: Number(puzzleRating),
        },
        token,
      );
      navigate("/");
    } catch {
      setErr("Error: couldn't save puzzle.");
    }
  };

  return {
    // state
    phase,
    chessPosition,
    colorToMove,
    whiteCastle,
    blackCastle,
    isEpEnabled,
    epSquare,
    answerInput,
    setPuzzleAnswer,
    puzzleRating,
    recordedMoves,
    err,
    // handlers
    onSetupPieceDrop,
    onRecordDrop,
    handleColorChange,
    handleWhiteCastleChange,
    handleBlackCastleChange,
    handleEnPassantToggle,
    handleEpTargetChange,
    handleLock,
    handleBackToSetup,
    handleReset,
    handleUndo,
    handlePuzzleRatingChange,
    handleSubmit,
  };
}
