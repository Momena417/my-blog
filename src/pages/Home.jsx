import React from "react";
import BlogCard from "../components/BlogCard";

function Home({ blogs, onDelete }) {
  return (
    <div className="min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">All Blogs</h2>
      {blogs.length === 0 ? (
        <p className="text-center text-gray-600">No blogs available. Click "New Post" to create one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
