import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, signOut, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

export default function Navbar() {
  const [user, setUser] = useState(null);

  // This listener automatically detects if the user is logged in or out
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b shadow-sm z-50">
      <Link to="/" className="text-2xl font-black text-gray-900 tracking-tighter">Envyte.</Link>
      
      <div className="flex items-center gap-6">
        {user ? (
          <>
            <span className="text-sm font-semibold text-gray-600">
              Hello, {user.displayName?.split(' ')[0] || 'User'} 👋
            </span>
            <Link to="/dashboard" className="text-sm font-bold text-black hover:text-gray-600 transition">
              Dashboard
            </Link>
            <button 
              onClick={() => signOut(auth)} 
              className="px-4 py-2 text-sm font-bold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button 
            onClick={handleLogin} 
            className="px-5 py-2.5 text-sm font-bold text-white bg-black rounded-full hover:bg-gray-800 transition"
          >
            Log In
          </button>
        )}
      </div>
    </nav>
  );
}