import { Fragment } from "react";
import PropTypes from "prop-types";
import { ShowPuzzle } from "./puzzle.jsx";

export function PuzzleList({ puzzle = [] }) {
  return (
    <div>
      {puzzle.map((p) => (
        <Fragment key={p._id}>
          <ShowPuzzle {...p} />
          <hr />
        </Fragment>
      ))}
    </div>
  );
}

PuzzleList.propTypes = {
  puzzle: PropTypes.arrayOf(PropTypes.shape(ShowPuzzle.propTypes)).isRequired,
};
