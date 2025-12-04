import { useEffect, useRef, useState } from "react";

export default function PGNViewer({ pgn, id }) {
  const boardRef = useRef(null);
  const boardId = `board-${id}`;
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (window.pgnView) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/@mliebelt/pgn-viewer@0.9.16/dist/pgn-viewer.min.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  useEffect(() => {
    if (scriptLoaded && pgn) {
      window.pgnView(boardId, {
        pgn,
        timerTime: "1",
        locale: "en",
        startPlay: 1,
        showResult: true,
        boardSize: 340,
        showFen: true,
        pieceStyle: "merida",
      });
    }
  }, [scriptLoaded, pgn]);

  return <div id={boardId} ref={boardRef}></div>;
}
