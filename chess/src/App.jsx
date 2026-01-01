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
import { ViewOwnPuzzlePage } from "./pages/ViewOwnPuzzle.jsx";
import { UserPuzzlePage } from "./pages/userPuzzleView.jsx";
import { ViewAllUserPuzzlePage } from "./pages/viewAllUserPuzzlePage.jsx";
import { ViewPublicPuzzle } from "./pages/ViewPublicPuzzlePage.jsx";

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
            <Route
              path="/"
              element={<Index key={window.location.pathname} />}
            />
            <Route
              path="/login"
              element={<Login key={window.location.pathname} />}
            />
            <Route
              path="/puzzle/:id"
              element={<PuzzlePage key={window.location.pathname} />}
            />
            <Route
              path="/today"
              element={<Index key={window.location.pathname} />}
            />
            <Route
              path="/signup"
              element={<Signup key={window.location.pathname} />}
            />
            <Route
              path="/list"
              element={<PuzzleListPage key={window.location.pathname} />}
            />
            <Route
              path="/score"
              element={<Scoreboard key={window.location.pathname} />}
            />
            <Route
              path="/about"
              element={<About key={window.location.pathname} />}
            />
            <Route
              path="/profile/:id"
              element={<Index key={window.location.pathname} />}
            />
            <Route
              path="/makeuserpuzzle"
              element={<MakeUserPuzzlePage key={window.location.pathname} />}
            />
            <Route
              path="/userpuzzlelist"
              element={<ViewOwnPuzzlePage key={window.location.pathname} />}
            />
            <Route
              path="/viewuserpuzzle/:id"
              element={<UserPuzzlePage key={window.location.pathname} />}
            />
            <Route
              path="/ViewAllUserPuzzlePage"
              element={<ViewAllUserPuzzlePage />}
            />
            <Route
              path="/ViewPublicUserPuzzle/:id"
              element={<ViewPublicPuzzle />}
            />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
