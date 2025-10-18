import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditBlog() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the blog by id from localStorage
        const storedBlogs = localStorage.getItem('blogs');
        const blogs = storedBlogs ? JSON.parse(storedBlogs) : [];
        const blogToEdit = blogs.find(blog => blog.id === Number(id));
        if (blogToEdit) {
            setTitle(blogToEdit.title);
            setDescription(blogToEdit.description);
        } else {
            // If no blog found, navigate back to home
            navigate('/');
        }
    }, [id, navigate]);

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            alert("Title and description cannot be empty");
            return;
        }
        const storedBlogs = localStorage.getItem('blogs');
        let blogs = storedBlogs ? JSON.parse(storedBlogs) : [];
        // Update the blog in the array
        blogs = blogs.map(blog => {
            if (blog.id === Number(id)) {
                return { ...blog, title, description };
            }
            return blog;
        });
        // Save updated list to localStorage
        localStorage.setItem('blogs', JSON.stringify(blogs));
        // Navigate back to home
        navigate('/');
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>
            <form onSubmit={handleUpdate} className="bg-white shadow-md rounded-lg p-6">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter blog title"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full h-40 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter blog description"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Update Blog
                </button>
            </form>
        </div>
    );
}

export default EditBlog;
