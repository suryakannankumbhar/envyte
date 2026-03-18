export default function BeachTemplate({ data }) {
  const bgImage = data.bgImage || "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800";
  const eventsList = data.events || [];
  const getMapUrl = (venue) => venue ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue)}` : "#";

  return (
    <div 
      className={`min-h-max w-full bg-cover bg-center bg-fixed relative flex flex-col items-center pb-32 text-[#1a1a1a] ${data.fontClass}`}
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      {/* Light gradient overlay for a breezy feel */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/50 to-white/20 pointer-events-none"></div>

      <div className="w-full max-w-sm relative z-10 px-6 pt-20">
        
        {/* Airy Left-Aligned Hero */}
        <div className="mb-20">
          <p className="text-[9px] tracking-[0.3em] uppercase mb-4 font-bold text-[#1a1a1a]/60">You are invited</p>
          <h1 className="text-6xl font-serif mb-1 tracking-tighter leading-none text-[#1a1a1a]">{data.bride || 'Bride'}</h1>
          <p className="text-4xl italic font-serif text-[#1a1a1a]/40 my-1 ml-8">&</p>
          <h1 className="text-6xl font-serif mb-10 tracking-tighter leading-none text-[#1a1a1a]">{data.groom || 'Groom'}</h1>
          
          <div className="bg-white/40 backdrop-blur-sm border-l-2 border-[#1a1a1a] p-4 mt-8">
            <p className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/60 mb-2">Families</p>
            <p className="text-xs font-bold tracking-wider mb-1">{data.groomParents}</p>
            <p className="text-xs font-bold tracking-wider">{data.brideParents}</p>
          </div>
        </div>

        {/* Staggered Glass Cards */}
        {eventsList.length > 0 && (
          <div className="relative w-full">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-10 font-bold text-center border-b border-[#1a1a1a]/20 pb-4">Celebrations</p>
            
            <div className="space-y-8">
              {eventsList.map((evt, idx) => (
                <div 
                  key={idx} 
                  // Alternate margins to create a staggered, offset layout
                  className={`bg-white/70 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] w-[90%] ${idx % 2 === 0 ? 'ml-0 rounded-tr-sm' : 'ml-auto rounded-tl-sm text-right'}`}
                >
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[#1a1a1a]/50 mb-2">{evt.date}</p>
                  <h3 className="text-4xl font-serif mb-3 text-[#1a1a1a]">{evt.type}</h3>
                  <p className="text-xs uppercase tracking-widest text-[#1a1a1a]/70 mb-4">{evt.time}</p>
                  
                  <div className={`mt-4 pt-4 border-t border-[#1a1a1a]/10 ${idx % 2 === 0 ? '' : 'flex flex-col items-end'}`}>
                    <p className="text-xs font-medium tracking-wide mb-2">{evt.venue}</p>
                    {evt.venue && (
                      <a href={getMapUrl(evt.venue)} target="_blank" rel="noreferrer" className="inline-block bg-[#1a1a1a] text-white px-4 py-2 rounded-full text-[9px] uppercase tracking-widest font-bold hover:bg-black transition-colors">
                        Map
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}