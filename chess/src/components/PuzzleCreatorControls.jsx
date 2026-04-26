import PropTypes from "prop-types";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

export function PuzzleCreatorControls({
  phase,
  colorToMove,
  whiteCastle,
  blackCastle,
  isEpEnabled,
  epSquare,
  answerInput,
  // eslint-disable-next-line
  setPuzzleAnswer,
  puzzleRating,
  recordedMoves,
  chessPosition,
  // handlers
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
}) {
  return (
    <div style={{ marginTop: "20px", fontFamily: "sans-serif" }}>
      {/* ── Phase buttons ── */}
      <div
        style={{
          marginBottom: "14px",
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        {phase === "setup" ? (
          <button
            type="button"
            onClick={handleLock}
            style={{
              padding: "6px 14px",
              background: "#2a7a2a",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Solve puzzle
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={handleUndo}
              disabled={recordedMoves.length === 0}
              style={{
                padding: "6px 14px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Undo
            </button>
            <button
              type="button"
              onClick={handleBackToSetup}
              style={{
                padding: "6px 14px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Back to Setup
            </button>
          </>
        )}
        <button
          type="button"
          onClick={handleReset}
          style={{
            padding: "6px 14px",
            background: "#a33",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Reset Board
        </button>
      </div>

      {/* ── Setup-only controls ── */}
      {phase === "setup" && (
        <>
          {/* Color to move */}
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

          {/* Castling */}
          <div style={{ marginBottom: "10px" }}>
            <label>
              White Castle:
              <select
                value={whiteCastle}
                onChange={handleWhiteCastleChange}
                style={{ marginLeft: "5px", marginRight: "15px" }}
              >
                <option value="KQ">King &amp; Queen (KQ)</option>
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
                <option value="kq">King &amp; Queen (kq)</option>
                <option value="k">King side (k)</option>
                <option value="q">Queen side (q)</option>
                <option value="">None</option>
              </select>
            </label>
          </div>

          {/* En passant */}
          <div style={{ marginBottom: "10px" }}>
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
            {isEpEnabled === "true" && (
              <label style={{ marginLeft: "15px" }}>
                Target Square:
                <select
                  value={epSquare}
                  onChange={handleEpTargetChange}
                  style={{ marginLeft: "5px" }}
                >
                  <option value="-">Select...</option>
                  {FILES.map((file) => {
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
        </>
      )}

      {/* ── Submit form ── */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "8px" }}></div>
        <div style={{ marginBottom: "12px" }}>
          <label>
            Puzzle rating:&nbsp;
            <input
              type="text"
              value={puzzleRating}
              onChange={handlePuzzleRatingChange}
              placeholder="100–3000"
              style={{ width: "80px", marginLeft: "5px" }}
            />
          </label>
        </div>
        <button
          type="submit"
          style={{
            padding: "6px 18px",
            background: "#1a5fa8",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Submit Puzzle
        </button>
      </form>
      <br />
      <div style={{ marginTop: "12px", fontSize: "12px", color: "#666" }}>
        <strong>Answer PGN:</strong> {answerInput || "—"}
      </div>

      <div style={{ marginTop: "12px", fontSize: "12px", color: "#666" }}>
        <strong>FEN:</strong> {chessPosition}
      </div>
    </div>
  );
}

PuzzleCreatorControls.propTypes = {
  phase: PropTypes.string.isRequired,
  colorToMove: PropTypes.string.isRequired,
  whiteCastle: PropTypes.string.isRequired,
  blackCastle: PropTypes.string.isRequired,
  isEpEnabled: PropTypes.string.isRequired,
  epSquare: PropTypes.string.isRequired,
  answerInput: PropTypes.string.isRequired,
  setPuzzleAnswer: PropTypes.func.isRequired,
  puzzleRating: PropTypes.string.isRequired,
  recordedMoves: PropTypes.array.isRequired,
  chessPosition: PropTypes.string.isRequired,
  handleColorChange: PropTypes.func.isRequired,
  handleWhiteCastleChange: PropTypes.func.isRequired,
  handleBlackCastleChange: PropTypes.func.isRequired,
  handleEnPassantToggle: PropTypes.func.isRequired,
  handleEpTargetChange: PropTypes.func.isRequired,
  handleLock: PropTypes.func.isRequired,
  handleBackToSetup: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleUndo: PropTypes.func.isRequired,
  handlePuzzleRatingChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
