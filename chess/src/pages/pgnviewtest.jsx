import PGNViewer from "../components/pgnviewercomponent.jsx";
import { SideBar } from "../components/sidebar.jsx";
import { useFetchAllPuzzles } from "../hooks/useFetchAllHook.js";

export function Test() {
  const { puzzles, isLoading, isError } = useFetchAllPuzzles();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;
  if (!puzzles || puzzles.length === 0) return <p>No puzzles</p>;

  return (
    <SideBar>
      <div className="puzzleGrid">
        {puzzles.map((p) => (
          <PGNViewer key={p._id} pgn={p.pgn} id={p._id} />
        ))}
      </div>
    </SideBar>
  );
}
