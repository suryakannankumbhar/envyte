import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { Link } from 'react-router-dom';

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
      // Remove it from the local state so it disappears instantly
      setInvites(invites.filter(inv => inv.id !== inviteId));
    } catch (error) {
      console.error("Error deleting invite:", error);
      alert("Failed to delete the invite. Please try again.");
    }
  };

  if (loading) {
    return <div className="p-20 text-center text-gray-500 font-medium">Loading your dashboard...</div>;
  }

  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-black text-gray-900 mb-8">Your Invites</h1>
        
        {!auth.currentUser ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 mb-4 font-medium">Please log in to view your saved invites.</p>
          </div>
        ) : invites.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 mb-6 font-medium">You haven't published any invites yet.</p>
            <Link to="/editor" className="px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition">
              Create your first invite
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {invites.map(invite => {
              // Format the theme name dynamically
              const themeDisplay = invite.theme === 'location_vibe' ? 'Location' : invite.theme || 'Classic';
              
              return (
                <div key={invite.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col hover:shadow-md transition">
                  <p className="text-xs font-bold text-rose-500 tracking-widest uppercase mb-2">
                    {themeDisplay} Theme
                  </p>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-1">
                    {invite.bride} & {invite.groom}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">{invite.date}</p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 flex gap-2">
                    <Link 
                      to={`/editor`}
                      state={{ inviteId: invite.id }} 
                      className="flex-1 text-center py-2 bg-black text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition"
                    >
                      Edit Details
                    </Link>
                    
                    <a 
                      href={`/invite/${invite.id}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex-1 text-center py-2 bg-gray-100 text-gray-900 text-sm font-bold rounded-xl hover:bg-gray-200 transition"
                    >
                      Live Link
                    </a>

                    <button 
                      onClick={() => handleDelete(invite.id)}
                      className="px-4 py-2 bg-red-50 text-red-600 text-sm font-bold rounded-xl hover:bg-red-100 transition"
                      title="Delete Invite"
                    >
                      🗑️
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