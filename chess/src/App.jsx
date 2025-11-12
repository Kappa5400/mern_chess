import React from "react";
import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Index } from "./pages/Index.jsx";
import { PuzzlePage } from "./pages/puzzle_page.jsx";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/puzzle/:id" element={<PuzzlePage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
