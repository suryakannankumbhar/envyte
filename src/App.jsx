import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './config/firebase'; 

// Import all your pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';

// Import the Template Engine to render the live invites
import TemplateEngine from './templates/TemplateEngine';

// ==========================================
// LIVE INVITE COMPONENT (What the guests see)
// ==========================================
function LiveInvite() {
  const { id } = useParams(); // Grabs the slug from the URL (e.g., "sneha-and-suraj")
  const [inviteData, setInviteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchInvite = async () => {
      try {
        const docRef = doc(db, "invites", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setInviteData(docSnap.data());
        } else {
          setError(true); // Document doesn't exist
        }
      } catch (err) {
        console.error("Error fetching invite:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchInvite();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0e13] text-white/50 tracking-[0.2em] uppercase text-sm font-medium">
        Loading Invite...
      </div>
    );
  }

  if (error || !inviteData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6">
        <h1 className="text-4xl font-serif text-gray-900 mb-4">Invite Not Found</h1>
        <p className="text-gray-500 max-w-sm leading-relaxed">
          The link you followed may be broken, or the couple has deleted this invitation.
        </p>
      </div>
    );
  }

  // If we found the data, pass it to the Engine to render it full-screen!
  return <TemplateEngine data={inviteData} />;
}


// ==========================================
// MAIN APP ROUTER
// ==========================================
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The beautiful premium storefront */}
        <Route path="/" element={<Home />} />
        
        {/* The user's management portal */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* The creation tool */}
        <Route path="/editor" element={<Editor />} />
        
        {/* The dynamic route for guests viewing the live invite */}
        <Route path="/invite/:id" element={<LiveInvite />} />
      </Routes>
    </BrowserRouter>
  );
}