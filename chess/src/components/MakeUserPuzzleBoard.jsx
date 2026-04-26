import styles from "./chessboard_puzzle.module.css";
import { usePuzzleCreator } from "../hooks/usePuzzleCreator";
import { PuzzleSetupBoard } from "./PuzzleSetupBoard";
import { PuzzleRecordBoard } from "./PuzzleRecordBoard";
import { PuzzleCreatorControls } from "./PuzzleCreatorControls";

export function MakeUserPuzzleBoard() {
  const creator = usePuzzleCreator();

  return (
    <div className={styles.Puzzle}>
      {creator.phase === "setup" ? (
        <PuzzleSetupBoard
          chessPosition={creator.chessPosition}
          onPieceDrop={creator.onSetupPieceDrop}
        />
      ) : (
        <PuzzleRecordBoard
          chessPosition={creator.chessPosition}
          onPieceDrop={creator.onRecordDrop}
          colorToMove={creator.colorToMove}
          recordedMoves={creator.recordedMoves}
          answerInput={creator.answerInput}
        />
      )}

      {creator.err && (
        <div style={{ color: "red", marginBottom: "10px", fontFamily: "sans-serif" }}>
          {creator.err}
        </div>
      )}

      <PuzzleCreatorControls {...creator} />
    </div>
  );
}

MakeUserPuzzleBoard.propTypes = {};
