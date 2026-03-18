import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // <-- IMPORT NAVBAR

export default function Dashboard() {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const q = query(collection(db, "invites"), where("userId", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const fetchedInvites = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          // Sort by newest first
          fetchedInvites.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setInvites(fetchedInvites);
        } catch (error) {
          console.error("Error fetching invites:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setInvites([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (inviteId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this invite? This cannot be undone.");
    if (!isConfirmed) return;
    try {
      await deleteDoc(doc(db, "invites", inviteId));
      setInvites(invites.filter(inv => inv.id !== inviteId));
    } catch (error) {
      console.error("Error deleting invite:", error);
      alert("Failed to delete the invite. Please try again.");
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'Recently';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return <div className="min-h-screen bg-[#0a0a0c] pt-32 text-center text-gray-500 font-medium">Loading your dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white pt-[72px] font-sans">
      <Navbar /> {/* <-- RENDER NAVBAR */}
      
      <div className="max-w-6xl mx-auto p-8 pt-12">
        <h1 className="text-4xl font-serif text-white mb-2">Your Invites</h1>
        <p className="text-gray-400 mb-10 text-sm">Manage and share your digital invitations.</p>
        
        {!auth.currentUser ? (
          <div className="text-center py-24 bg-[#121214] rounded-3xl border border-white/10">
            <p className="text-gray-400 mb-6 font-medium">Please log in to view your saved invites.</p>
          </div>
        ) : invites.length === 0 ? (
          <div className="text-center py-24 bg-[#121214] rounded-3xl border border-white/10">
            <p className="text-gray-400 mb-6 font-medium text-lg">You haven't published any invites yet.</p>
            <Link to="/editor" className="px-8 py-3 bg-amber-500 text-black rounded-full font-bold hover:bg-amber-400 transition-colors inline-block">
              Create your first invite ✨
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {invites.map(invite => {
              const themeDisplay = invite.theme === 'location_vibe' ? 'Location' : invite.theme || 'Classic';
              
              return (
                <div key={invite.id} className="bg-[#121214] p-6 rounded-3xl border border-white/10 flex flex-col hover:border-white/30 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-[10px] font-bold text-amber-500 tracking-widest uppercase bg-amber-500/10 px-3 py-1 rounded-full">
                      {themeDisplay} Theme
                    </p>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                      Created: {formatDate(invite.createdAt)}
                    </p>
                  </div>
                  
                  <h3 className="text-2xl font-serif text-white mb-1">
                    {invite.bride} <span className="text-amber-500 italic font-light">&</span> {invite.groom}
                  </h3>
                  <p className="text-xs text-gray-400 mb-8 tracking-wide uppercase">{invite.date}</p>
                  
                  <div className="mt-auto pt-6 border-t border-white/10 flex gap-2">
                    <Link 
                      to={`/editor`}
                      state={{ inviteId: invite.id }} 
                      className="flex-1 text-center py-2.5 bg-white/10 text-white text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-white/20 transition-colors"
                    >
                      Edit
                    </Link>
                    
                    <a 
                      href={`/invite/${invite.id}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex-1 text-center py-2.5 bg-amber-500 text-black text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-amber-400 transition-colors"
                    >
                      View Live
                    </a>

                    <button 
                      onClick={() => handleDelete(invite.id)}
                      className="px-4 py-2 bg-red-500/10 text-red-500 text-sm font-bold rounded-xl hover:bg-red-500/20 transition-colors flex items-center justify-center"
                      title="Delete Invite"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}