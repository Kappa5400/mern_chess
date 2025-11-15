import PropTypes from "prop-types";

export function ShowPuzzleText({ puzzles }) {
  const puzzleList = puzzles || [];

  return (
    <div>
      {puzzleList.map((p, i) => (
        <div key={p.date || i} className="p-4 border-b border-gray-200">
          <p className="text-xs text-gray-500 mb-1">
            <span className="font-bold">Date:</span> {p.date} |
            <span className="font-bold ml-4">Rating:</span> {p.rating}
          </p>
          <div className="bg-gray-100 p-2 rounded text-sm font-mono break-all">
            <span className="font-bold text-blue-700">PGN:</span> {p.pgn}
          </div>
          <p className="text-sm mt-1">
            <span className="font-bold">Answer:</span> {p.answer}
          </p>
        </div>
      ))}

      {puzzleList.length === 0 && (
        <p className="text-gray-500 p-4">パズルデータがありません。</p>
      )}
    </div>
  );
}

ShowPuzzleText.propTypes = {
  puzzles: PropTypes.arrayOf(
    PropTypes.shape({
      pgn: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })
  ).isRequired,
};
