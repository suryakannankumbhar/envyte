export default function IllustrationTemplate({ data }) {
  const bgImage = data.bgImage || "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=800";

  // Map user's font choice to actual CSS classes
  const getFontClasses = () => {
    switch (data.fontPairing) {
      case 'playfair-lato':
        return { heading: 'font-playfair', body: 'font-lato' };
      case 'cinzel-montserrat':
        return { heading: 'font-cinzel', body: 'font-montserrat' };
      case 'greatvibes-raleway':
        return { heading: 'font-greatvibes', body: 'font-raleway' };
      default:
        return { heading: 'font-cormorant', body: 'font-montserrat' };
    }
  };

  const fonts = getFontClasses();
  
  // Safe fallback for events if none exist yet
  const eventsList = data.events || [];

  return (
    <div className={`w-full bg-[#2a1b41] text-white overflow-hidden relative`}>
      
      {/* --- INJECT PREMIUM FONTS --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lato:wght@300;400&family=Cinzel:wght@400;600&family=Great+Vibes&family=Raleway:wght@300;400&display=swap');
        
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-lato { font-family: 'Lato', sans-serif; }
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-greatvibes { font-family: 'Great Vibes', cursive; font-size: 1.3em; }
        .font-raleway { font-family: 'Raleway', sans-serif; }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) rotate(3deg); }
          50% { transform: translateY(-30px) rotate(-3deg); }
        }
        .lantern { filter: drop-shadow(0 0 15px rgba(255, 100, 0, 0.8)); }
      `}</style>

      {/* --- SECTION 1: HERO --- */}
      <div 
        className="relative h-screen w-full flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('${bgImage}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#2a1b41] pointer-events-none"></div>

        <div className="absolute top-1/4 left-10 w-8 h-12 bg-gradient-to-t from-orange-500 to-pink-500 rounded-t-lg rounded-b-sm lantern opacity-80" style={{ animation: 'float-slow 4s ease-in-out infinite' }}></div>
        <div className="absolute top-1/3 right-12 w-10 h-16 bg-gradient-to-t from-orange-500 to-pink-500 rounded-t-lg rounded-b-sm lantern opacity-90" style={{ animation: 'float-fast 5s ease-in-out infinite' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-6 h-10 bg-gradient-to-t from-orange-500 to-pink-500 rounded-t-lg rounded-b-sm lantern opacity-70" style={{ animation: 'float-slow 6s ease-in-out infinite' }}></div>

        <div className="relative z-10 text-center mt-12 px-4">
          <h1 className={`text-6xl md:text-7xl text-[#ffd700] mb-2 drop-shadow-2xl tracking-wide leading-tight ${fonts.heading}`}>{data.bride || 'Bride'}</h1>
          <p className={`text-2xl italic text-white/90 mb-2 drop-shadow-md ${fonts.heading}`}>weds</p>
          <h1 className={`text-6xl md:text-7xl text-[#ffd700] drop-shadow-2xl tracking-wide leading-tight ${fonts.heading}`}>{data.groom || 'Groom'}</h1>
        </div>

        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest uppercase animate-bounce ${fonts.body}`}>
          Scroll<br/>↓
        </div>
      </div>

      {/* --- SECTION 2: BLESSING & PARENTS --- */}
      <div 
        className="relative py-20 px-8 text-center flex flex-col items-center"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
      >
        
        {/* Motif removed here */}

        <p className={`text-xs text-white/80 uppercase tracking-[0.2em] mb-4 ${fonts.body}`}>You are invited by</p>
        
        {/* Dynamic Parent Names */}
        <h2 className={`text-3xl text-[#ffd700] mb-2 ${fonts.heading}`}>{data.groomParents || 'Groom\'s Parents'}</h2>
        <h2 className={`text-3xl text-[#ffd700] mb-16 ${fonts.heading}`}>{data.brideParents || 'Bride\'s Parents'}</h2>

        <h1 className={`text-4xl md:text-5xl text-white tracking-widest opacity-90 border-b border-white/20 pb-4 ${fonts.heading}`}>INVITE</h1>
        <p className={`text-sm text-white/70 mt-6 italic ${fonts.heading}`}>You to join us in the wedding celebrations</p>
      </div>

      {/* --- SECTION 3: DYNAMIC EVENTS GRID --- */}
      <div className="relative py-16 px-6">
        <div className="flex flex-col gap-20">
          
          {eventsList.length === 0 ? (
            <div className={`text-center text-white/50 italic ${fonts.body}`}>No events added yet. Add them in the editor!</div>
          ) : (
            eventsList.map((evt, index) => (
              <div key={index} className="flex flex-col items-center text-center animate-[fadeInUp_0.5s_ease-out]">
                
                {/* The Ornate Frame */}
                <div className="w-56 h-72 rounded-t-full border-[8px] border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.2)] overflow-hidden mb-6 relative ring-2 ring-[#ffd700]/30 bg-black/40 flex items-center justify-center">
                  {evt.image ? (
                    <img src={evt.image} alt={evt.type} className="w-full h-full object-cover" />
                  ) : (
                    /* Beautiful Placeholder if no image is provided */
                    <div className="flex flex-col items-center opacity-40">
                      <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      <span className={`text-[10px] tracking-widest uppercase ${fonts.body}`}>{evt.type}</span>
                    </div>
                  )}
                </div>

                {/* Event Details */}
                <h3 className={`text-4xl text-[#ffd700] mb-3 ${fonts.heading}`}>{evt.type}</h3>
                <p className={`text-sm text-white/90 mb-1 font-light tracking-wide ${fonts.body}`}>{evt.date || 'Date TBD'}</p>
                <p className={`text-xs text-white/70 mb-1 ${fonts.body}`}>{evt.venue || 'Venue TBD'}</p>
                <p className={`text-xs text-white/70 mb-5 ${fonts.body}`}>{evt.time || 'Time TBD'}</p>
                
                {/* Maps placeholder button */}
                <button className={`text-xs uppercase tracking-[0.2em] text-[#ffd700] border-b border-[#ffd700] pb-1 hover:text-white transition-colors ${fonts.body}`}>
                  See the route
                </button>

              </div>
            ))
          )}

        </div>
      </div>
      
      {/* Footer spacer */}
      <div className="h-24 w-full bg-[#2a1b41] flex items-center justify-center">
         <p className={`text-[10px] text-white/30 uppercase tracking-widest ${fonts.body}`}>Made with Envyte</p>
      </div>

    </div>
  );
}