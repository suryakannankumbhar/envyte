import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './config/firebase'; 

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import Templates from './pages/Templates'; // <-- IMPORT NEW PAGE
import TemplateEngine from './templates/TemplateEngine';

function LiveInvite() {
  const { id } = useParams(); 
  const [inviteData, setInviteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchInvite = async () => {
      try {
        const docRef = doc(db, "invites", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setInviteData(docSnap.data());
        else setError(true);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchInvite();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#0f0e13] text-white/50 tracking-[0.2em] uppercase text-sm font-medium">Loading Invite...</div>;
  if (error || !inviteData) return <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6"><h1 className="text-4xl font-serif text-gray-900 mb-4">Invite Not Found</h1></div>;

  return <TemplateEngine data={inviteData} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<Templates />} /> {/* <-- NEW ROUTE */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/invite/:id" element={<LiveInvite />} />
      </Routes>
    </BrowserRouter>
  );
}