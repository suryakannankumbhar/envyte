import { useState, useEffect } from 'react';
import { collection, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import { db, auth, googleProvider } from '../config/firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import TemplateEngine from '../templates/TemplateEngine';
import Navbar from '../components/Navbar';

const LOCATION_VIBES = {
  kashmir: { bg: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=800', color: 'rose', label: 'Mountain' },
  kerala: { bg: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800', color: 'emerald', label: 'Kerala' },
  paris: { bg: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800', color: 'gold', label: 'Paris' },
  spain: { bg: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&q=80&w=800', color: 'gold', label: 'Spain' },
  australia: { bg: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800', color: 'emerald', label: 'Beach' },
  architecture: { bg: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800', color: 'rose', label: 'City' }
};

const EVENT_TYPES = ['Haldi', 'Mehendi', 'Sangeet', 'Wedding', 'Reception', 'Roka', 'Cocktail', 'Pool Party'];
const generateSlug = (bride, groom) => `${bride.toLowerCase().replace(/[^a-z0-9]/g, '')}-and-${groom.toLowerCase().replace(/[^a-z0-9]/g, '')}-${Math.random().toString(36).substring(2, 6)}`;

export default function Editor() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const existingInviteId = location.state?.inviteId;
  const importedTemplate = location.state?.selectedTemplate; 
  const isEditing = !!existingInviteId;

  // Initialize state. If they clicked a template in the gallery, pre-fill those design choices!
  const [inviteData, setInviteData] = useState({
    bride: 'Sneha',
    groom: 'Suraj',
    brideParents: 'Mrs. Manisha & Ajay Arora',
    groomParents: 'Mrs. Vandana & Kishore Singh',
    date: 'May 23, 2026', 
    venue: 'The Grand Taj Palace, Mumbai', 
    heroImage: '',
    theme: importedTemplate?.theme || 'mountain',
    bgImage: importedTemplate?.bgImage || LOCATION_VIBES.kashmir.bg,
    color: importedTemplate?.color || 'rose',
    fontPairing: importedTemplate?.fontPairing || 'cormorant-montserrat',
    events: [
      { type: 'Mehendi', date: 'Monday, 4th Feb 2026', time: '9:00 PM', venue: 'W Resort, Goa', image: '' },
      { type: 'Haldi', date: 'Tuesday, 5th Feb 2026', time: '10:00 AM', venue: 'Taj Exotica Resort, Goa', image: '' },
      { type: 'Wedding', date: 'Wednesday, 6th Feb 2026', time: '4:00 PM', venue: 'Taj Exotica Resort, Goa', image: '' }
    ]
  });

  const [publishedLink, setPublishedLink] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [loading, setLoading] = useState(isEditing);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('details'); 
  const [showPreviewOnMobile, setShowPreviewOnMobile] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const fetchExistingInvite = async () => {
        try {
          const docSnap = await getDoc(doc(db, "invites", existingInviteId));
          if (docSnap.exists()) setInviteData(docSnap.data());
        } finally { setLoading(false); }
      };
      fetchExistingInvite();
    }
  }, [isEditing, existingInviteId]);

  const handleChange = (e) => { setInviteData({ ...inviteData, [e.target.name]: e.target.value }); setShowSuccess(false); };
  const handleDesignChange = (key, value) => { setInviteData({ ...inviteData, [key]: value }); setShowSuccess(false); };
  const addEvent = () => { setInviteData({ ...inviteData, events: [...inviteData.events, { type: 'Sangeet', date: '', time: '', venue: '', image: '' }] }); setShowSuccess(false); };
  const removeEvent = (indexToRemove) => { setInviteData({ ...inviteData, events: inviteData.events.filter((_, index) => index !== indexToRemove) }); setShowSuccess(false); };
  const handleEventChange = (index, field, value) => { const newEvents = [...inviteData.events]; newEvents[index][field] = value; setInviteData({ ...inviteData, events: newEvents }); setShowSuccess(false); };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      let currentUser = auth.currentUser;
      if (!currentUser) {
        const result = await signInWithPopup(auth, googleProvider);
        currentUser = result.user;
      }
      const finalInviteData = { ...inviteData, userId: currentUser.uid, updatedAt: new Date().toISOString() };

      if (isEditing) {
        await updateDoc(doc(db, "invites", existingInviteId), finalInviteData);
        setPublishedLink(`${window.location.origin}/invite/${existingInviteId}`);
      } else {
        finalInviteData.createdAt = new Date().toISOString();
        const customSlug = generateSlug(inviteData.bride, inviteData.groom);
        await setDoc(doc(db, "invites", customSlug), finalInviteData);
        setPublishedLink(`${window.location.origin}/invite/${customSlug}`);
        navigate('.', { replace: true, state: { inviteId: customSlug } });
      }
      setShowSuccess(true);
    } catch (error) { console.error("Error saving:", error); } 
    finally { setIsPublishing(false); }
  };

  if (loading) return <div className="min-h-screen bg-[#050505] pt-32 text-center text-gray-500">Loading studio...</div>;

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-[#050505] font-sans pt-[72px]">
      <Navbar />

      {/* --- MOBILE PREVIEW TOGGLE --- */}
      <div className="md:hidden flex bg-[#121214]/80 backdrop-blur-md border-b border-white/10 z-20 sticky top-[72px]">
         <button onClick={() => setShowPreviewOnMobile(false)} className={`flex-1 py-3 font-bold text-xs uppercase tracking-widest transition-all ${!showPreviewOnMobile ? 'border-b-2 border-amber-500 text-amber-500' : 'text-gray-500 hover:text-gray-300'}`}>Editor</button>
         <button onClick={() => setShowPreviewOnMobile(true)} className={`flex-1 py-3 font-bold text-xs uppercase tracking-widest transition-all ${showPreviewOnMobile ? 'border-b-2 border-amber-500 text-amber-500' : 'text-gray-500 hover:text-gray-300'}`}>Preview 👀</button>
      </div>

      {/* --- LEFT PANEL: GLASSMORPHISM EDITOR --- */}
      <div className={`${showPreviewOnMobile ? 'hidden' : 'flex'} md:flex w-full md:w-[450px] bg-white/5 backdrop-blur-2xl md:border-r border-white/10 shadow-2xl z-10 flex-col h-full overflow-y-auto`}>
        
        <div className="flex border-b border-white/10 shrink-0 bg-black/20">
          <button onClick={() => setActiveTab('details')} className={`flex-1 py-4 font-bold text-[10px] uppercase tracking-widest transition-all ${activeTab === 'details' ? 'border-b-2 border-amber-500 text-amber-500' : 'text-gray-500 hover:text-white'}`}>Details</button>
          <button onClick={() => setActiveTab('design')} className={`flex-1 py-4 font-bold text-[10px] uppercase tracking-widest transition-all ${activeTab === 'design' ? 'border-b-2 border-amber-500 text-amber-500' : 'text-gray-500 hover:text-white'}`}>Design</button>
        </div>

        <div className="p-6 md:p-8 flex-1">
          {/* --- DETAILS TAB --- */}
          {activeTab === 'details' && (
            <div className="space-y-10 pb-10">
              <div className="space-y-5">
                <h3 className="text-lg font-serif text-white border-b border-white/10 pb-2">Main Details</h3>
                
                {/* --- WARNING LOGIC --- */}
                {!isEditing ? (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                    <p className="text-xs text-amber-500 font-semibold tracking-wide">⚠️ Bride & Groom names lock after publishing.</p>
                  </div>
                ) : (
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
                    <p className="text-[10px] text-gray-400 font-semibold tracking-widest uppercase">Names are locked for published invites.</p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Bride Name</label>
                    <input type="text" name="bride" value={inviteData.bride} onChange={handleChange} disabled={isEditing} className={`w-full bg-white/5 border border-white/10 text-white p-3 rounded-xl outline-none transition-all text-sm focus:ring-1 focus:ring-amber-500/50 ${isEditing ? 'opacity-50 cursor-not-allowed' : ''}`} />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Groom Name</label>
                    <input type="text" name="groom" value={inviteData.groom} onChange={handleChange} disabled={isEditing} className={`w-full bg-white/5 border border-white/10 text-white p-3 rounded-xl outline-none transition-all text-sm focus:ring-1 focus:ring-amber-500/50 ${isEditing ? 'opacity-50 cursor-not-allowed' : ''}`} />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Bride's Parents</label>
                  <input type="text" name="brideParents" value={inviteData.brideParents} onChange={handleChange} className="w-full bg-white/5 border border-white/10 text-white p-3 rounded-xl focus:ring-1 focus:ring-amber-500/50 outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Groom's Parents</label>
                  <input type="text" name="groomParents" value={inviteData.groomParents} onChange={handleChange} className="w-full bg-white/5 border border-white/10 text-white p-3 rounded-xl focus:ring-1 focus:ring-amber-500/50 outline-none transition-all text-sm" />
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between border-t border-white/10 pt-8 pb-2">
                   <h3 className="text-lg font-serif text-white">Itinerary</h3>
                   <button onClick={addEvent} className="text-[9px] bg-white/10 text-white border border-white/20 px-3 py-1.5 rounded-full hover:bg-amber-500 hover:text-black hover:border-amber-500 font-bold uppercase tracking-widest transition-all">+ Add Event</button>
                </div>

                {inviteData.events.map((evt, index) => (
                  <div key={index} className="p-5 border border-white/10 rounded-2xl bg-black/20 relative group shadow-lg">
                    <button onClick={() => removeEvent(index)} className="absolute top-3 right-3 text-gray-500 hover:text-red-400 text-[10px] font-bold uppercase tracking-widest transition-colors">Remove</button>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 mt-4 sm:mt-0 pr-0 sm:pr-12">
                      <div>
                        <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Function</label>
                        <select value={evt.type} onChange={(e) => handleEventChange(index, 'type', e.target.value)} className="w-full border border-white/10 p-3 rounded-xl outline-none text-sm bg-[#121214] text-white focus:ring-1 focus:ring-amber-500/50">
                          {EVENT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Date</label>
                        <input type="text" value={evt.date} onChange={(e) => handleEventChange(index, 'date', e.target.value)} className="w-full border border-white/10 p-3 rounded-xl outline-none text-sm bg-white/5 text-white focus:ring-1 focus:ring-amber-500/50" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Time</label>
                        <input type="text" value={evt.time} onChange={(e) => handleEventChange(index, 'time', e.target.value)} className="w-full border border-white/10 p-3 rounded-xl outline-none text-sm bg-white/5 text-white focus:ring-1 focus:ring-amber-500/50" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Venue</label>
                        <input type="text" value={evt.venue} onChange={(e) => handleEventChange(index, 'venue', e.target.value)} className="w-full border border-white/10 p-3 rounded-xl outline-none text-sm bg-white/5 text-white focus:ring-1 focus:ring-amber-500/50" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Image URL (Optional)</label>
                      <input type="text" value={evt.image} onChange={(e) => handleEventChange(index, 'image', e.target.value)} className="w-full border border-white/10 p-3 rounded-xl outline-none text-xs bg-[#222] text-white focus:ring-1 focus:ring-amber-500/50" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- DESIGN TAB --- */}
          {activeTab === 'design' && (
            <div className="space-y-10 pb-10">
              <div>
                <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-3">Architecture Style</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'classic', label: 'Editorial' },
                    { id: 'vintage', label: 'Archive' },
                    { id: 'royal', label: 'Palace' },
                    { id: 'mountain', label: 'Mountain' },
                    { id: 'beach', label: 'Beach' }
                  ].map(t => (
                    <button key={t.id} onClick={() => handleDesignChange('theme', t.id)} className={`py-4 rounded-xl border text-[10px] font-bold tracking-widest uppercase transition-all ${inviteData.theme === t.id ? 'bg-amber-500 text-black border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'}`}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Show scenic backgrounds ONLY if Mountain or Beach is selected */}
              {(inviteData.theme === 'mountain' || inviteData.theme === 'beach') && (
                <div className="animate-[fadeIn_0.3s_ease-out] pt-6 border-t border-white/10">
                  <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-4">Scenic Backdrop</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {Object.keys(LOCATION_VIBES).map(vibeKey => {
                      const vibe = LOCATION_VIBES[vibeKey];
                      const isActive = inviteData.bgImage === vibe.bg;
                      return (
                        <button key={vibeKey} onClick={() => handleDesignChange('bgImage', vibe.bg)} className={`relative flex flex-col items-center transition-all duration-300 rounded-xl overflow-hidden ${isActive ? 'scale-105 shadow-[0_0_20px_rgba(245,158,11,0.2)] border-2 border-amber-500' : 'opacity-60 hover:opacity-100 border-2 border-transparent'}`}>
                          <div className="w-full h-20 bg-cover bg-center" style={{ backgroundImage: `url('${vibe.bg}')` }} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-2">
                             <span className={`text-[9px] font-bold uppercase tracking-widest ${isActive ? 'text-amber-500' : 'text-white'}`}>{vibe.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-white/10">
                <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-3">Typography Pairing</label>
                <div className="grid grid-cols-1 gap-3">
                  <button onClick={() => handleDesignChange('fontPairing', 'cormorant-montserrat')} className={`py-4 px-4 rounded-xl border flex justify-between items-center transition-all ${inviteData.fontPairing === 'cormorant-montserrat' ? 'bg-white/10 border-amber-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                     <span className="text-white font-serif text-lg">Classic Serif</span>
                     <span className="text-[9px] text-amber-500 uppercase tracking-widest font-bold">Select</span>
                  </button>
                  <button onClick={() => handleDesignChange('fontPairing', 'cinzel-montserrat')} className={`py-4 px-4 rounded-xl border flex justify-between items-center transition-all ${inviteData.fontPairing === 'cinzel-montserrat' ? 'bg-white/10 border-amber-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                     <span className="text-white font-serif text-lg tracking-widest">Roman</span>
                     <span className="text-[9px] text-amber-500 uppercase tracking-widest font-bold">Select</span>
                  </button>
                  <button onClick={() => handleDesignChange('fontPairing', 'playfair-lato')} className={`py-4 px-4 rounded-xl border flex justify-between items-center transition-all ${inviteData.fontPairing === 'playfair-lato' ? 'bg-white/10 border-amber-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                     <span className="text-white font-serif text-lg italic">Editorial</span>
                     <span className="text-[9px] text-amber-500 uppercase tracking-widest font-bold">Select</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 pt-6 border-t border-white/10 pb-20 md:pb-0">
            <button onClick={handlePublish} disabled={isPublishing} className="w-full bg-white text-black py-4 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:bg-white/10 disabled:text-gray-500 disabled:shadow-none disabled:scale-100">
              {isPublishing ? 'Deploying...' : (isEditing ? 'Save Studio Changes' : (auth.currentUser ? 'Generate Live Link' : 'Log in to Generate'))}
            </button>

            {showSuccess && publishedLink && (
              <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center backdrop-blur-sm">
                <p className="text-xs text-amber-500 font-bold mb-2 uppercase tracking-widest">{isEditing ? 'Studio Updated' : 'Invite Deployed'}</p>
                <a href={publishedLink} target="_blank" rel="noreferrer" className="text-white border-b border-white/30 pb-0.5 text-[10px] font-medium tracking-widest uppercase hover:text-amber-500 hover:border-amber-500 transition-colors">
                  Open Live Link →
                </a>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* --- RIGHT PANEL: HIGH-END PHONE MOCKUP --- */}
      <div className={`${!showPreviewOnMobile ? 'hidden' : 'flex'} md:flex flex-1 items-center justify-center p-6 md:p-12 h-[calc(100vh-72px)] relative`}>
        
        {/* Ambient mesh background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-[#050505] to-[#050505] pointer-events-none"></div>

        {/* The Outer Physical Phone Body */}
        <div className="relative w-full max-w-[360px] h-[780px] max-h-[85vh] bg-[#0a0a0c] shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-[3rem] p-[10px] md:p-[14px] ring-1 ring-white/10 flex-shrink-0 z-10">
          
          {/* Hardware Side Buttons */}
          <div className="absolute top-[120px] -left-[2px] w-[3px] h-[26px] bg-gray-800 rounded-l-md"></div>
          <div className="absolute top-[170px] -left-[2px] w-[3px] h-[50px] bg-gray-800 rounded-l-md"></div>
          <div className="absolute top-[230px] -left-[2px] w-[3px] h-[50px] bg-gray-800 rounded-l-md"></div>
          <div className="absolute top-[180px] -right-[2px] w-[3px] h-[70px] bg-gray-800 rounded-r-md"></div>

          {/* The Inner Screen (Perfectly curved to clip the content) */}
          <div className="relative w-full h-full bg-black rounded-[2.2rem] md:rounded-[2.4rem] overflow-hidden mask-image">
            
            {/* Dynamic Island / Sleek Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 h-7 w-28 bg-black rounded-full z-50 flex items-center justify-between px-2.5 shadow-sm">
               <div className="w-2.5 h-2.5 bg-gray-900/80 rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]"></div>
            </div>
            
            {/* Scrollable Screen Content */}
            <div className="h-full w-full overflow-y-auto scroll-smooth pb-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style>{`
                .overflow-y-auto::-webkit-scrollbar { display: none; }
              `}</style>
              <TemplateEngine data={inviteData} />
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}