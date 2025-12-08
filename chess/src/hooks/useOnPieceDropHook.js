import { useCallback } from "react";

export function useChessPieceDrop(
  chessGameRef,
  setChessPosition,
  whiteToMove,
  onMoveSuccess
) {
  // onPieceDropをuseCallbackでメモ化
  const onPieceDrop = useCallback(
    (sourceSquare, targetSquare) => {
      const game = chessGameRef.current;

      // 1. 手番チェック (Turn Guard)
      // ゲーム内の手番と、プレイヤーの色(whiteToMove)が一致しなければ動かせない
      const isWhiteTurn = game.turn() === "w";
      if ((isWhiteTurn && !whiteToMove) || (!isWhiteTurn && whiteToMove)) {
        return false;
      }

      try {
        // 2. 移動の実行 (Attempt Move)
        const move = game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: "q", // 簡易化のため常にクイーンに昇格
        });

        // 無効な手なら false を返す (盤面のスナップバック)
        if (move === null) return false;

        // 3. 状態更新 (Update State)
        // 成功した場合のみ盤面を更新
        setChessPosition(game.fen());

        // 4. 追加アクションのトリガー (Trigger callback)
        // 例: パズルの正解判定や、CPUの着手などを呼び出す
        if (onMoveSuccess) {
          onMoveSuccess(move);
        }

        return true;
      } catch (e) {
        return false;
      }
    },
    [chessGameRef, setChessPosition, whiteToMove, onMoveSuccess]
  );

  return onPieceDrop;
}
