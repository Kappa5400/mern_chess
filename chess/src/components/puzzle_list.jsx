import PropTypes from "prop-types";

export function ShowPuzzle({ puzzles }) {
  return (
    <div>
      {puzzles.map((p, i) => (
        <div key={i}>
          <p>Puzzle information:</p>
          <h3>
            {p.pgn} {p.answer} {p.date} {p.rating}
          </h3>
        </div>
      ))}
    </div>
  );
}

ShowPuzzle.propTypes = {
  puzzles: PropTypes.arrayOf(
    PropTypes.shape({
      pgn: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })
  ).isRequired,
};
