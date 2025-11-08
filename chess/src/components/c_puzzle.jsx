import PropTypes from "prop-types";

export function ShowPuzzle({ pgn, answer, date, rating }) {
  return (
    <div>
      <p>Puzzle information:</p>
      <h3>
        {pgn} {answer} {date} {rating}
      </h3>
    </div>
  );
}

ShowPuzzle.propTypes = {
  pgn: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};
