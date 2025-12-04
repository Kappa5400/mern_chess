import React from "react";
import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Index } from "./pages/Index.jsx";
import { PuzzlePage } from "./pages/puzzle_page.jsx";
import { Login } from "./pages/login_page.jsx";
import { Signup } from "./pages/signup_page.jsx";
import { PuzzleListPage } from "./pages/PuzzleListPage.jsx";
import { AuthContext, AuthContextProvider } from "./contexts/AuthContext.jsx";
import { Test } from "./pages/pgnviewtest.jsx";

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
            <Route path="/score" element={<Index />} />
            <Route path="/about" element={<Index />} />
            <Route path="/profile/:id" element={<Index />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
