import React from 'react';
import { Link } from 'react-router-dom';

function BlogCard({ post, onDelete }) {
  return (
    <div className="bg-seashell border border-champagne rounded-lg p-4 shadow-sm">
      <h2 className="text-xl font-bold text-grape mb-2">{post.title}</h2>
      <p className="text-gray-800 mb-4">{post.description}</p>
      <div className="flex space-x-2">
        {/* Edit button as a link */}
        <Link 
          to={`/edit/${post.id}`} 
          className="bg-grape text-seashell px-3 py-1 rounded hover:opacity-90"
        >
          Edit
        </Link>
        {/* Delete button */}
        <button 
          onClick={() => onDelete(post.id)} 
          className="bg-rose text-white px-3 py-1 rounded hover:opacity-90"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default BlogCard;
