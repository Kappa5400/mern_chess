import { ShowPuzzle } from "./components/c_puzzle.jsx";
import React from "react";
import { SideBar } from "./components/c_sidebar.jsx";
import { Profile } from "./components/c_profile.jsx";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { get_all_Puzzle } from "./api/api_puzzle.js";

const queryClient = new QueryClient();

function PuzzleContainer() {
  const puzzleQuery = useQuery({
    queryKey: ["puzzle"],
    queryFn: () => get_all_Puzzle(),
  });

  if (puzzleQuery.isLoading) return <p>Loading...</p>;
  if (puzzleQuery.isError) return <p>Error loading puzzles</p>;

  console.log("Puzzle data:", puzzleQuery.data);

  const retrieved_puzzle = puzzleQuery.data?.flat() ?? [];

  console.log("Retrieved puzzle:", retrieved_puzzle);

  return <ShowPuzzle puzzles={retrieved_puzzle} />;
}

export function App() {
  const menuItems = ["Home", "Today's Puzzle", "Puzzle List"];

  const user = {
    name: "Test",
    avatar_url:
      "https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvdXB3azYyMDQ3NzczLXdpa2ltZWRpYS1pbWFnZS1qb2I2MjEta3pycm44YngucG5n.png",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ display: "flex", height: "100vh" }}>
        <SideBar items={menuItems} />
        <main style={{ flex: 1, padding: "1rem", position: "relative" }}>
          <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
            <Profile {...user} />
          </div>
          <h1>Welcome to Chess Puzzle App</h1>
          <PuzzleContainer />
        </main>
      </div>
    </QueryClientProvider>
  );
}
