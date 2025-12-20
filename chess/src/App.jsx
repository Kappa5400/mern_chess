import React from "react";
import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Index } from "./pages/Index.jsx";
import { PuzzlePage } from "./pages/puzzle_page.jsx";
import { Login } from "./pages/login_page.jsx";
import { Signup } from "./pages/signup_page.jsx";
import { PuzzleListPage } from "./pages/PuzzleListPage.jsx";
import { AuthContext, AuthContextProvider } from "./contexts/AuthContext.jsx";
import { About } from "./pages/About.jsx";
import { Scoreboard } from "./pages/Scoreboard.jsx";
import { MakeUserPuzzlePage } from "./pages/MakeUserPuzzlePage.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/puzzle/:id" element={<PuzzlePage />} />
            <Route path="/today" element={<Index />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/list" element={<PuzzleListPage />} />
            <Route path="/score" element={<Scoreboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile/:id" element={<Index />} />
            <Route path="/userpuzzlelist" element={<Index />} />
            <Route path="/makeuserpuzzle" element={<MakeUserPuzzlePage />} />
            <Route path="/userpuzzlelist" element={<Index />} />
            <Route path="/viewuserpuzzle/:id" element={<Index />} />
            <Route path="/publicuserpuzzlelist" element={<Index />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
