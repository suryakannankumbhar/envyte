export default function ClassicTemplate({ data }) {
  const eventsList = data.events || [];

  const getMapUrl = (venue) => {
    if (!venue) return "#";
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue)}`;
  };

  return (
    // Ivory background with charcoal text
    <div className={`min-h-max bg-[#F9F8F6] flex flex-col items-center justify-start p-6 text-center pb-24 text-[#2C2C2C] ${data.fontClass}`}>
      
      {/* The main editorial container */}
      <div className={`w-full max-w-sm pt-8`}>
        
        {data.heroImage && (
          <div className="w-full aspect-[4/5] mb-12 overflow-hidden bg-gray-200">
            <img src={data.heroImage} alt="Pre-wedding" className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-1000" />
          </div>
        )}

        <div className="mb-14">
          <p className="text-[8px] tracking-[0.4em] uppercase mb-6 font-semibold opacity-60">With blessings from</p>
          <p className="text-xs tracking-widest uppercase mb-1">{data.groomParents || "Groom's Parents"}</p>
          <p className="text-lg italic my-2 font-serif opacity-50">&</p>
          <p className="text-xs tracking-widest uppercase">{data.brideParents || "Bride's Parents"}</p>
        </div>

        <div className="w-full border-t border-[#2C2C2C]/10 mb-14"></div>

        <p className="text-[9px] tracking-[0.3em] uppercase mb-8 font-semibold opacity-60">
          Invite you to celebrate
        </p>
        
        {/* Editorial Overlapping Typography */}
        <div className="relative mb-16">
          <h1 className="text-7xl font-serif tracking-tight ml-[-20px] mb-[-10px]">{data.bride || 'Bride'}</h1>
          <p className="text-3xl italic font-serif opacity-40 ml-16 relative z-10">&</p>
          <h1 className="text-7xl font-serif tracking-tight mr-[-20px] mt-[-15px]">{data.groom || 'Groom'}</h1>
        </div>
        
        <div className="w-full border-t border-[#2C2C2C]/10 mb-16"></div>

        {eventsList.length > 0 ? (
          <div className="space-y-16">
            <p className="text-[9px] tracking-[0.4em] uppercase mb-10 font-bold opacity-80">Itinerary</p>
            {eventsList.map((evt, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <h3 className="text-4xl font-serif mb-4 italic">{evt.type}</h3>
                
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-px bg-[#2C2C2C]/30"></div>
                  <p className="text-xs font-semibold tracking-widest uppercase">{evt.date}</p>
                  <div className="w-8 h-px bg-[#2C2C2C]/30"></div>
                </div>

                <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">{evt.time}</p>
                <p className="text-xs font-medium tracking-wide mb-6">{evt.venue}</p>
                
                {evt.venue && (
                  <a 
                    href={getMapUrl(evt.venue)} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[9px] uppercase tracking-widest font-bold border-b border-[#2C2C2C] pb-1 hover:opacity-50 transition-opacity"
                  >
                    View Map
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-sm font-semibold tracking-widest uppercase mb-2">{data.date || 'Date TBD'}</p>
            <p className="text-xs opacity-70 mb-6 font-medium">{data.venue || 'Venue TBD'}</p>
            {data.venue && (
              <a 
                href={getMapUrl(data.venue)} 
                target="_blank" 
                rel="noreferrer"
                className="text-[9px] uppercase tracking-widest font-bold border-b border-[#2C2C2C] pb-1 hover:opacity-50 transition-opacity"
              >
                View Map
              </a>
            )}
          </div>
        )}

      </div>
    </div>
  );
}