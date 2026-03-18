export default function RoyalTemplate({ data }) {
  const eventsList = data.events || [];

  const getMapUrl = (venue) => {
    if (!venue) return "#";
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue)}`;
  };

  return (
    // Deep regal background (Emerald or Maroon based on color classes, defaults to a rich dark emerald)
    <div className={`min-h-max flex flex-col items-center justify-start bg-[#0A1813] text-[#FDFBF7] pb-24 relative overflow-hidden ${data.fontClass}`}>
      
      {/* Subtle ambient background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2.5L22.5 16 25 13.5V0h2v13.5L29.5 16 32 18.5V20h20v2H32v2.5L29.5 27 27 29.5V40h-2V29.5L22.5 27 20 24.5V22H0v-2h20z' fill='%23D4AF37' fill-rule='evenodd'/%3E%3C/svg%3E")` }}></div>

      <div className="w-full max-w-sm relative z-10 px-6 pt-12 text-center">
        
        {/* Ornate Header Motif */}
        <div className="flex justify-center mb-8">
          <svg className="w-16 h-16 text-[#D4AF37]" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 L55 35 L90 50 L55 65 L50 100 L45 65 L10 50 L45 35 Z" opacity="0.8"/>
            <circle cx="50" cy="50" r="15" fill="#0A1813" />
            <circle cx="50" cy="50" r="10" />
          </svg>
        </div>

        {data.heroImage && (
          // Elegant Archway Image Frame
          <div className="w-48 h-64 mx-auto mb-10 overflow-hidden relative p-1">
            <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37] via-[#FFF3A3] to-[#997A15] rounded-t-[100px] rounded-b-md"></div>
            <img src={data.heroImage} alt="Pre-wedding" className="relative w-full h-full object-cover rounded-t-[96px] rounded-b-sm border-4 border-[#0A1813]" />
          </div>
        )}

        <div className="mb-10 flex flex-col items-center">
          <p className="text-[9px] tracking-[0.3em] uppercase mb-4 text-[#D4AF37] font-semibold">With the blessings of</p>
          <p className="text-sm font-medium tracking-wide">{data.groomParents || "Groom's Parents"}</p>
          <p>&</p>
          <p className="text-sm font-medium tracking-wide">{data.brideParents || "Bride's Parents"}</p>
        </div>

        <p className="text-[10px] tracking-[0.3em] uppercase mb-8 text-[#D4AF37]/80">
          Request the honor of your presence
        </p>

        {/* Gold Foil Typography Effect */}
        <h1 className="text-6xl font-serif mb-2 bg-gradient-to-r from-[#D4AF37] via-[#FFF3A3] to-[#997A15] text-transparent bg-clip-text leading-tight drop-shadow-sm pb-1">
          {data.bride || 'Bride'}
        </h1>
        <p className="text-xl italic mb-2 text-[#D4AF37]/80 font-serif">weds</p>
        <h1 className="text-6xl font-serif mb-12 bg-gradient-to-r from-[#D4AF37] via-[#FFF3A3] to-[#997A15] text-transparent bg-clip-text leading-tight drop-shadow-sm pb-1">
          {data.groom || 'Groom'}
        </h1>
        
        {/* Elegant SVG Divider */}
        <div className="flex justify-center items-center gap-4 mb-12 opacity-70">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
          <div className="w-2 h-2 rotate-45 bg-[#D4AF37]"></div>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
        </div>

        {eventsList.length > 0 ? (
          <div className="space-y-12">
            <p className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#D4AF37]">The Celebrations</p>
            {eventsList.map((evt, idx) => (
              <div key={idx} className="relative border border-[#D4AF37]/30 p-8 text-center bg-[#0A1813]/50 backdrop-blur-sm">
                
                {/* Corner Accents */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-[#D4AF37]"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-[#D4AF37]"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-[#D4AF37]"></div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-[#D4AF37]"></div>

                <h3 className="text-3xl font-serif text-[#FDFBF7] mb-3">{evt.type}</h3>
                <p className="text-sm font-medium text-[#D4AF37] tracking-widest uppercase mb-1">{evt.date}</p>
                <p className="text-xs text-white/70 mb-4 font-light">{evt.time}</p>
                <p className="text-[11px] text-white/90 uppercase tracking-widest leading-relaxed mb-6 max-w-[200px] mx-auto">{evt.venue}</p>
                
                {evt.venue && (
                  <a href={getMapUrl(evt.venue)} target="_blank" rel="noreferrer" className="inline-block border border-[#D4AF37] text-[#D4AF37] text-[9px] uppercase tracking-widest px-6 py-2 hover:bg-[#D4AF37] hover:text-[#0A1813] transition-colors">
                    Navigate
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-[#D4AF37]/30 p-8">
            <p className="text-lg text-[#D4AF37] tracking-widest mb-2">{data.date || 'Date TBD'}</p>
            <p className="text-xs text-white/70 uppercase tracking-widest mb-6">{data.venue || 'Venue TBD'}</p>
            {data.venue && (
               <a href={getMapUrl(data.venue)} target="_blank" rel="noreferrer" className="inline-block border border-[#D4AF37] text-[#D4AF37] text-[9px] uppercase tracking-widest px-6 py-2 hover:bg-[#D4AF37] hover:text-[#0A1813] transition-colors">
                 Navigate
               </a>
            )}
          </div>
        )}

      </div>
    </div>
  );
}