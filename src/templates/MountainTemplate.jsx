export default function MountainTemplate({ data }) {
  const bgImage = data.bgImage || "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=800";
  const eventsList = data.events || [];
  const getMapUrl = (venue) => venue ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue)}` : "#";

  return (
    <div 
      className={`min-h-max w-full bg-cover bg-center bg-fixed relative flex flex-col items-center pb-32 text-white ${data.fontClass}`}
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0a0a0c] pointer-events-none"></div>

      <div className="w-full max-w-sm relative z-10 px-6 pt-24 text-center">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl mb-16">
          <p className="text-[9px] tracking-[0.4em] uppercase mb-8 font-medium text-white/70">Join us in the mountains</p>
          <h1 className="text-6xl font-serif mb-2 tracking-tight">{data.bride || 'Bride'}</h1>
          <p className="text-sm italic font-serif text-white/50 my-3">and</p>
          <h1 className="text-6xl font-serif mb-10 tracking-tight">{data.groom || 'Groom'}</h1>
          <div className="w-12 h-px bg-white/30 mx-auto mb-8"></div>
          <div className="flex flex-col gap-2">
            <p className="text-[10px] uppercase tracking-widest text-white/50">With blessings from</p>
            <p className="text-xs font-semibold tracking-wider">{data.groomParents}</p>
            <p className="text-xs font-semibold tracking-wider">{data.brideParents}</p>
          </div>
        </div>

        {eventsList.length > 0 && (
          <div className="relative mt-24">
            <p className="text-[10px] tracking-[0.4em] uppercase mb-16 font-bold text-white/90">The Itinerary</p>
            <div className="absolute left-1/2 top-24 bottom-0 w-px bg-white/20 -translate-x-1/2"></div>
            <div className="space-y-16 relative z-10">
              {eventsList.map((evt, idx) => (
                <div key={idx} className="relative flex flex-col items-center">
                  <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.6)] mb-6 ring-4 ring-black/40"></div>
                  <div className="bg-[#0a0a0c]/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl w-[90%] shadow-xl">
                    <h3 className="text-3xl font-serif mb-2">{evt.type}</h3>
                    <p className="text-xs font-medium tracking-widest uppercase text-white/90 mb-1">{evt.date}</p>
                    <p className="text-[10px] uppercase tracking-widest text-white/50 mb-5">{evt.time}</p>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                      <p className="text-[11px] font-medium tracking-wide mb-3">{evt.venue}</p>
                      {evt.venue && (
                        <a href={getMapUrl(evt.venue)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-white/70 hover:text-white transition-colors">
                          Directions →
                        </a>
                      )}
                    </div>
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