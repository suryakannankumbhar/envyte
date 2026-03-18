import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAuth = async () => {
    try {
      if (user) {
        await signOut(auth);
        navigate('/');
      } else {
        await signInWithPopup(auth, googleProvider);
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-[72px] bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-6 md:px-12">
      {/* Brand Logo */}
      <Link to="/" className="text-2xl font-serif text-white tracking-widest flex items-center gap-1">
        Envyte<span className="text-amber-500">.</span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6 md:gap-8">
        <Link to="/editor" className="text-xs md:text-sm text-gray-300 hover:text-white uppercase tracking-widest font-semibold transition-colors">
          Create
        </Link>
        <Link to="/dashboard" className="text-xs md:text-sm text-gray-300 hover:text-white uppercase tracking-widest font-semibold transition-colors">
          Dashboard
        </Link>
        
        {/* Auth Button */}
        <button 
          onClick={handleAuth}
          className="text-xs md:text-sm px-4 py-2 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all font-semibold tracking-wider"
        >
          {user ? 'Log Out' : 'Log In'}
        </button>
      </div>
    </nav>
  );
}