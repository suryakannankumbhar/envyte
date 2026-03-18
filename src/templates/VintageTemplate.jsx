export default function VintageTemplate({ data }) {
  const eventsList = data.events || [];

  const getMapUrl = (venue) => {
    if (!venue) return "#";
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue)}`;
  };

  return (
    // Off-white paper background with dark brown/charcoal ink
    <div className={`relative min-h-max flex flex-col items-center justify-start bg-[#EAE6DF] text-[#2C2825] overflow-hidden pb-24 ${data.fontClass}`}>
      
      {/* Film Grain SVG Filter */}
      <div 
        className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply z-50"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      ></div>

      <div className="w-full max-w-sm px-6 pt-12 relative z-10 text-center">
        
        {/* Retro Header Box */}
        <div className="border-[1.5px] border-[#2C2825] p-2 mb-12">
          <div className="border border-[#2C2825] py-4 px-2">
            <p className="text-[8px] font-mono uppercase tracking-[0.3em] font-bold mb-3 opacity-80">Vol. 01 — A Celebration</p>
            <p className="text-[10px] tracking-widest uppercase font-medium">{data.groomParents || "Groom's Parents"}</p>
            <p className="text-[10px] tracking-widest uppercase font-medium mt-1">{data.brideParents || "Bride's Parents"}</p>
          </div>
        </div>

        {data.heroImage && (
          // Polaroid / Film Frame Style
          <div className="w-full p-3 bg-white border border-[#2C2825]/20 shadow-md mb-12 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
            <div className="w-full aspect-square overflow-hidden bg-[#2C2825]">
              <img src={data.heroImage} alt="Pre-wedding" className="w-full h-full object-cover sepia-[0.3] contrast-125 grayscale-[0.5]" />
            </div>
            <div className="w-full text-left pt-3 pb-1">
              <p className="font-mono text-[9px] uppercase tracking-widest opacity-50">Archive No. 429</p>
            </div>
          </div>
        )}

        <h1 className="text-7xl font-serif mb-1 tracking-tighter leading-none">{data.bride || 'Bride'}</h1>
        <p className="text-3xl italic font-serif opacity-70 my-2">&</p>
        <h1 className="text-7xl font-serif mb-16 tracking-tighter leading-none">{data.groom || 'Groom'}</h1>
        
        {eventsList.length > 0 ? (
          <div className="w-full border-t-2 border-[#2C2825] pt-12 text-left">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold mb-10 text-center">Sequence of Events</p>
            
            {eventsList.map((evt, idx) => (
              <div key={idx} className="mb-10 flex flex-col items-start border-l-2 border-[#2C2825] pl-6 relative">
                {/* Tick mark on border */}
                <div className="absolute -left-[5px] top-2 w-2 h-2 bg-[#2C2825] rounded-full"></div>
                
                <h3 className="text-3xl font-serif mb-1">{evt.type}</h3>
                <div className="flex gap-4 font-mono text-[9px] uppercase tracking-widest opacity-80 mb-3">
                  <span>{evt.date}</span>
                  <span>//</span>
                  <span>{evt.time}</span>
                </div>
                
                <p className="text-xs font-medium tracking-wide uppercase max-w-[80%] leading-relaxed mb-3">{evt.venue}</p>
                
                {evt.venue && (
                  <a 
                    href={getMapUrl(evt.venue)} 
                    target="_blank" 
                    rel="noreferrer"
                    className="font-mono text-[9px] uppercase tracking-widest font-bold border-b border-[#2C2825] pb-0.5 hover:bg-[#2C2825] hover:text-[#EAE6DF] transition-colors"
                  >
                    [ Map ]
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="border-t-2 border-b-2 border-[#2C2825] py-8 my-10">
            <p className="font-mono text-sm tracking-widest uppercase font-bold mb-2">{data.date || 'Date TBD'}</p>
            <p className="text-xs tracking-widest uppercase mb-4">{data.venue || 'Venue TBD'}</p>
            {data.venue && (
              <a 
                href={getMapUrl(data.venue)} 
                target="_blank" 
                rel="noreferrer"
                className="font-mono text-[9px] uppercase tracking-widest font-bold border-b border-[#2C2825] pb-0.5 hover:bg-[#2C2825] hover:text-[#EAE6DF] transition-colors"
              >
                [ Map ]
              </a>
            )}
          </div>
        )}

      </div>
    </div>
  );
}