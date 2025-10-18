import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewBlog from "./pages/NewBlog";
import EditBlog from "./pages/EditBlog";
import Navbar from "./components/Navbar";

function App() {
  const [blogs, setBlogs] = useState([]);

  const addBlog = (newBlog) => {
    setBlogs([...blogs, { ...newBlog, id: Date.now() }]);
  };

  const updateBlog = (updatedBlog) => {
    setBlogs(blogs.map(blog => (blog.id === updatedBlog.id ? updatedBlog : blog)));
  };

  const deleteBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-400 via-pink-300 to-orange-200 text-gray-800">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 md:px-12 py-8">
        <Routes>
          <Route path="/" element={<Home blogs={blogs} onDelete={deleteBlog} />} />
          <Route path="/new" element={<NewBlog onAdd={addBlog} />} />
          <Route path="/edit/:id" element={<EditBlog blogs={blogs} onUpdate={updateBlog} />} />
        </Routes>
      </main>
      <footer className="bg-gray-900 text-white text-center p-4 mt-auto">
        <p>© 2025 My Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
