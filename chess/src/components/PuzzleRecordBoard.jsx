import { Chessboard } from "react-chessboard";
import PropTypes from "prop-types";

export function PuzzleRecordBoard({ chessPosition, onPieceDrop, colorToMove, recordedMoves, answerInput }) {
  return (
    <div>
      <p style={{ textAlign: "center", marginBottom: "8px", fontFamily: "sans-serif" }}>
        <strong>Record mode</strong> — play the puzzle answer moves on the board.
        &nbsp;Moves recorded: <strong>{recordedMoves.length}</strong>
        {recordedMoves.length > 0 && (
          <span style={{ marginLeft: "10px", color: "#555", fontSize: "13px" }}>
            ({answerInput})
          </span>
        )}
      </p>
      <Chessboard
        options={{
          position: chessPosition,
          onPieceDrop,
          boardWidth: 700,
          boardOrientation: colorToMove === "w" ? "white" : "black",
        }}
      />
    </div>
  );
}

PuzzleRecordBoard.propTypes = {
  chessPosition: PropTypes.string.isRequired,
  onPieceDrop: PropTypes.func.isRequired,
  colorToMove: PropTypes.string.isRequired,
  recordedMoves: PropTypes.array.isRequired,
  answerInput: PropTypes.string.isRequired,
};
