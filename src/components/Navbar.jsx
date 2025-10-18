import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-indigo-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">My Blog</Link>
        <Link to="/new" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">New Post</Link>
      </div>
    </nav>
  );
}