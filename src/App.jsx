import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import BlogList from "./pages/BlogList";
import NewBlog from "./pages/NewBlog";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-800">
        <Navbar />

        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/new" element={<NewBlog />} />
          {/* Fallback for unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <footer className="mt-16 border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8 text-sm text-slate-500">
            © {new Date().getFullYear()} Blogify — built with React & Tailwind
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
