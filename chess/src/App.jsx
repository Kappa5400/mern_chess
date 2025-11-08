import { ShowPuzzle } from "./components/c_puzzle.jsx";
import React from "react";
import { SideBar } from "./components/c_sidebar.jsx";
import { Profile } from "./components/c_profile.jsx";

export function App() {
  const menuItems = ["Home", "Today's Puzzle", "Puzzle List"];

  const user = {name: "Test", avatar_url: "https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvdXB3azYyMDQ3NzczLXdpa2ltZWRpYS1pbWFnZS1qb2I2MjEta3pycm44YngucG5n.png"}

  const examplePuzzle = {
    pgn: "e4",
    answer: "d5",
    date: "11/5/2025",
    rating: 100,
  };

return (
    <div style={{ display: "flex", height: "100vh" }}>
      <SideBar items={menuItems} />
      <main style={{ flex: 1, padding: "1rem", position: "relative" }}>
        <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
          <Profile {...user} />
        </div>
        <h1>Welcome to Chess Puzzle App</h1>
        <ShowPuzzle {...examplePuzzle} />
      </main>
    </div>
  );
}
