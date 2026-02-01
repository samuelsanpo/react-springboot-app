import { Link } from 'react-router-dom';

/**
 * Navigation bar.
 */
const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 backdrop-blur-md bg-white/80">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-globalside-blue rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <span className="text-white font-black">M</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            <span className="text-globalside-blue">Messages application</span>
          </span>
        </Link>
      
      </div>
    </nav>
  );
};

export default Navbar;