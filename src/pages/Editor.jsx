import { useState, useEffect } from 'react';
import { collection, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import { db, auth, googleProvider } from '../config/firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import TemplateEngine from '../templates/TemplateEngine';

const LOCATION_VIBES = {
  kashmir: { bg: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=800', color: 'rose', label: 'Kashmir' },
  kerala: { bg: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800', color: 'emerald', label: 'Kerala' },
  paris: { bg: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800', color: 'gold', label: 'Paris' },
  spain: { bg: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&q=80&w=800', color: 'gold', label: 'Spain' },
  australia: { bg: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800', color: 'emerald', label: 'Australia' },
  architecture: { bg: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800', color: 'rose', label: 'Palace' },
  nature: { bg: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800', color: 'emerald', label: 'Nature' },
};

const EVENT_TYPES = ['Haldi', 'Mehendi', 'Sangeet', 'Wedding', 'Reception', 'Roka', 'Cocktail', 'Pool Party'];

const generateSlug = (bride, groom) => {
  const clean = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, ''); 
  const shortId = Math.random().toString(36).substring(2, 6); 
  return `${clean(bride)}-and-${clean(groom)}-${shortId}`;
};

export default function Editor() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const existingInviteId = location.state?.inviteId;
  const isEditing = !!existingInviteId;

  const [inviteData, setInviteData] = useState({
    bride: 'Sneha',
    groom: 'Suraj',
    brideParents: 'Mrs. Manisha & Ajay Arora',
    groomParents: 'Mrs. Vandana & Kishore Singh',
    date: 'May 23, 2026', 
    venue: 'The Grand Taj Palace, Mumbai', 
    heroImage: '',
    bgImage: LOCATION_VIBES.kashmir.bg,
    theme: 'location_vibe',
    color: 'rose',
    fontPairing: 'cormorant-montserrat',
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
  
  // View states
  const [activeTab, setActiveTab] = useState('details'); 
  const [showPreviewOnMobile, setShowPreviewOnMobile] = useState(false);

  useEffect(() => {
    const fetchExistingInvite = async () => {
      if (isEditing) {
        try {
          const docRef = doc(db, "invites", existingInviteId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setInviteData(docSnap.data());
          }
        } catch (error) {
          console.error("Error fetching invite:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchExistingInvite();
  }, [isEditing, existingInviteId]);

  const handleChange = (e) => {
    setInviteData({ ...inviteData, [e.target.name]: e.target.value });
    setShowSuccess(false); 
  };

  const handleDesignChange = (key, value) => {
    setInviteData({ ...inviteData, [key]: value });
    setShowSuccess(false);
  };

  const addEvent = () => {
    setInviteData({
      ...inviteData,
      events: [...inviteData.events, { type: 'Sangeet', date: '', time: '', venue: '', image: '' }]
    });
    setShowSuccess(false);
  };

  const removeEvent = (indexToRemove) => {
    setInviteData({
      ...inviteData,
      events: inviteData.events.filter((_, index) => index !== indexToRemove)
    });
    setShowSuccess(false);
  };

  const handleEventChange = (index, field, value) => {
    const newEvents = [...inviteData.events];
    newEvents[index][field] = value;
    setInviteData({ ...inviteData, events: newEvents });
    setShowSuccess(false);
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      let currentUser = auth.currentUser;
      if (!currentUser) {
        const result = await signInWithPopup(auth, googleProvider);
        currentUser = result.user;
      }

      const finalInviteData = {
        ...inviteData,
        userId: currentUser.uid,
        updatedAt: new Date().toISOString()
      };

      if (isEditing) {
        const docRef = doc(db, "invites", existingInviteId);
        await updateDoc(docRef, finalInviteData);
        // FIX: Replaced localhost with window.location.origin
        setPublishedLink(`${window.location.origin}/invite/${existingInviteId}`);
        setShowSuccess(true);
      } else {
        finalInviteData.createdAt = new Date().toISOString();
        const customSlug = generateSlug(inviteData.bride, inviteData.groom);
        await setDoc(doc(db, "invites", customSlug), finalInviteData);
        
        // FIX: Replaced localhost with window.location.origin
        const newLink = `${window.location.origin}/invite/${customSlug}`;
        setPublishedLink(newLink);
        setShowSuccess(true);
        navigate('.', { replace: true, state: { inviteId: customSlug } });
      }
    } catch (error) {
      console.error("Error saving:", error);
      if (error.code !== 'auth/popup-closed-by-user') {
        alert("Failed to save. Please try again.");
      }
    } finally {
      setIsPublishing(false);
    }
  };

  if (loading) return <div className="p-20 text-center text-gray-500 font-medium">Loading editor...</div>;

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-gray-100">
      
      {/* --- MOBILE PREVIEW TOGGLE --- */}
      <div className="md:hidden flex bg-white border-b z-20 sticky top-0">
         <button 
           onClick={() => setShowPreviewOnMobile(false)}
           className={`flex-1 py-3 font-bold text-sm transition-all ${!showPreviewOnMobile ? 'border-b-2 border-black text-black' : 'text-gray-400'}`}
         >
           Editor
         </button>
         <button 
           onClick={() => setShowPreviewOnMobile(true)}
           className={`flex-1 py-3 font-bold text-sm transition-all ${showPreviewOnMobile ? 'border-b-2 border-black text-black' : 'text-gray-400'}`}
         >
           Preview 👀
         </button>
      </div>

      {/* --- LEFT PANEL: EDITOR --- */}
      <div className={`${showPreviewOnMobile ? 'hidden' : 'flex'} md:flex w-full md:w-1/3 lg:w-[400px] bg-white md:border-r shadow-2xl z-10 flex-col h-full overflow-y-auto`}>
        
        <div className="flex border-b shrink-0">
          <button 
            onClick={() => setActiveTab('details')}
            className={`flex-1 py-4 font-bold text-sm transition-all ${activeTab === 'details' ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Details
          </button>
          <button 
            onClick={() => setActiveTab('design')}
            className={`flex-1 py-4 font-bold text-sm transition-all ${activeTab === 'design' ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Design
          </button>
        </div>

        <div className="p-6 md:p-8 flex-1">
          
          {/* --- DETAILS TAB --- */}
          {activeTab === 'details' && (
            <div className="space-y-8 pb-10">
              
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Main Details</h3>
                {!isEditing && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-xs text-amber-800 font-semibold">⚠️ Bride & Groom names lock after publishing.</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Bride Name</label>
                    <input type="text" name="bride" value={inviteData.bride} onChange={handleChange} disabled={isEditing}
                      className={`w-full border p-2.5 rounded-lg outline-none transition-all text-sm ${isEditing ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'focus:ring-2 focus:ring-black bg-white border-gray-300'}`} />
                  </div>
                  <div>
                    <label className="block text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Groom Name</label>
                    <input type="text" name="groom" value={inviteData.groom} onChange={handleChange} disabled={isEditing}
                      className={`w-full border p-2.5 rounded-lg outline-none transition-all text-sm ${isEditing ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'focus:ring-2 focus:ring-black bg-white border-gray-300'}`} />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Bride's Parents</label>
                  <input type="text" name="brideParents" placeholder="e.g. Mrs. Sharma & Mr. Sharma" value={inviteData.brideParents} onChange={handleChange} 
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-black outline-none bg-white transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Groom's Parents</label>
                  <input type="text" name="groomParents" placeholder="e.g. Mrs. Singh & Mr. Singh" value={inviteData.groomParents} onChange={handleChange} 
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-black outline-none bg-white transition-all text-sm" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                   <h3 className="text-lg font-bold text-gray-900">Itinerary</h3>
                   <button onClick={addEvent} className="text-xs bg-black text-white px-3 py-1.5 rounded-md hover:bg-gray-800 font-bold">+ Add Event</button>
                </div>

                {inviteData.events.map((evt, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-xl bg-gray-50 relative group">
                    <button onClick={() => removeEvent(index)} className="absolute top-2 right-2 text-red-500 text-xs font-bold bg-red-50 px-2 py-1 rounded md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      Remove
                    </button>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 pr-0 sm:pr-10 mt-6 sm:mt-0">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Function</label>
                        <select 
                          value={evt.type} 
                          onChange={(e) => handleEventChange(index, 'type', e.target.value)}
                          className="w-full border border-gray-300 p-2 rounded-md outline-none text-sm bg-white focus:ring-1 focus:ring-black"
                        >
                          {EVENT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Date</label>
                        <input type="text" value={evt.date} placeholder="e.g. 4th Feb" onChange={(e) => handleEventChange(index, 'date', e.target.value)}
                          className="w-full border border-gray-300 p-2 rounded-md outline-none text-sm bg-white focus:ring-1 focus:ring-black" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Time</label>
                        <input type="text" value={evt.time} placeholder="e.g. 9:00 PM" onChange={(e) => handleEventChange(index, 'time', e.target.value)}
                          className="w-full border border-gray-300 p-2 rounded-md outline-none text-sm bg-white focus:ring-1 focus:ring-black" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Venue</label>
                        <input type="text" value={evt.venue} placeholder="e.g. Taj Hotel" onChange={(e) => handleEventChange(index, 'venue', e.target.value)}
                          className="w-full border border-gray-300 p-2 rounded-md outline-none text-sm bg-white focus:ring-1 focus:ring-black" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Image URL (Optional)</label>
                      <input type="text" value={evt.image} placeholder="Paste image link..." onChange={(e) => handleEventChange(index, 'image', e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-md outline-none text-xs bg-white focus:ring-1 focus:ring-black" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- DESIGN TAB --- */}
          {activeTab === 'design' && (
            <div className="space-y-8 pb-10">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Template Style</label>
                <div className="grid grid-cols-2 gap-2">
                  {['classic', 'vintage', 'royal', 'location_vibe'].map(t => (
                    <button key={t} onClick={() => handleDesignChange('theme', t)}
                      className={`py-3 rounded-xl border text-sm font-medium capitalize transition-all ${inviteData.theme === t ? 'bg-black text-white border-black shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'}`}>
                      {t === 'location_vibe' ? 'Locations ✨' : t}
                    </button>
                  ))}
                </div>
              </div>

              {inviteData.theme === 'location_vibe' && (
                <div className="animate-[fadeIn_0.3s_ease-out] pt-4 border-t border-gray-100">
                  <label className="block text-sm font-bold text-gray-900 mb-4">Choose Destination</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {Object.keys(LOCATION_VIBES).map(vibeKey => {
                      const vibe = LOCATION_VIBES[vibeKey];
                      const isActive = inviteData.bgImage === vibe.bg;
                      
                      return (
                        <button 
                          key={vibeKey} 
                          onClick={() => {
                            setInviteData({ ...inviteData, bgImage: vibe.bg, color: vibe.color });
                            setShowSuccess(false);
                          }}
                          className={`flex flex-col items-center gap-2 transition-all duration-300 rounded-xl ${isActive ? 'scale-105' : 'opacity-70 hover:opacity-100'}`}
                        >
                          <div className={`w-full h-16 rounded-xl border-2 bg-cover bg-center shadow-md ${isActive ? 'border-amber-500 ring-4 ring-amber-100' : 'border-transparent'}`} style={{ backgroundImage: `url('${vibe.bg}')` }} />
                          <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-amber-600' : 'text-gray-500'}`}>{vibe.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-8">
                    <label className="block text-sm font-bold text-gray-900 mb-3">Typography Pairing</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button onClick={() => handleDesignChange('fontPairing', 'cormorant-montserrat')} className={`py-3 rounded-xl border text-sm transition-all ${inviteData.fontPairing === 'cormorant-montserrat' ? 'bg-gray-100 border-gray-900 text-black font-bold' : 'bg-white text-gray-600 border-gray-200'}`}>Classic Elegance</button>
                      <button onClick={() => handleDesignChange('fontPairing', 'playfair-lato')} className={`py-3 rounded-xl border text-sm transition-all ${inviteData.fontPairing === 'playfair-lato' ? 'bg-gray-100 border-gray-900 text-black font-bold' : 'bg-white text-gray-600 border-gray-200'}`}>Modern Editorial</button>
                      <button onClick={() => handleDesignChange('fontPairing', 'cinzel-montserrat')} className={`py-3 rounded-xl border text-sm transition-all ${inviteData.fontPairing === 'cinzel-montserrat' ? 'bg-gray-100 border-gray-900 text-black font-bold' : 'bg-white text-gray-600 border-gray-200'}`}>Grand Roman</button>
                      <button onClick={() => handleDesignChange('fontPairing', 'greatvibes-raleway')} className={`py-3 rounded-xl border text-sm transition-all ${inviteData.fontPairing === 'greatvibes-raleway' ? 'bg-gray-100 border-gray-900 text-black font-bold' : 'bg-white text-gray-600 border-gray-200'}`}>Romantic Script</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-gray-100 pb-20 md:pb-0">
            <button 
              onClick={handlePublish} disabled={isPublishing}
              className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-95 disabled:bg-gray-400"
            >
              {isPublishing ? 'Saving...' : (isEditing ? 'Save Changes' : (auth.currentUser ? 'Publish & Get Link' : 'Log in to Publish'))}
            </button>

            {showSuccess && publishedLink && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-center shadow-sm">
                <p className="text-sm text-green-800 font-bold mb-2">{isEditing ? '✓ Changes saved.' : '🎉 Invite live!'}</p>
                <a href={publishedLink} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 underline break-all text-sm font-medium">
                  {publishedLink}
                </a>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* --- RIGHT PANEL: PREVIEW --- */}
      <div className={`${!showPreviewOnMobile ? 'hidden' : 'flex'} md:flex flex-1 items-center justify-center bg-stone-200 p-4 sm:p-8 overflow-hidden h-[calc(100vh-48px)] md:h-screen`}>
        <div className="relative w-full max-w-[375px] h-[80vh] md:h-[750px] max-h-[850px] bg-white shadow-2xl overflow-hidden border-[10px] md:border-[14px] border-gray-900 rounded-[2.5rem] md:rounded-[3rem] ring-1 ring-black/5 flex-shrink-0">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 h-5 md:h-6 w-24 md:w-32 bg-gray-900 rounded-full z-20"></div>
          <div className="h-full w-full overflow-y-auto no-scrollbar pb-10 relative">
            <TemplateEngine data={inviteData} />
          </div>
        </div>
      </div>

    </div>
  );
}