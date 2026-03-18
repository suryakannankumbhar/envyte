export default function VintageTemplate({ data }) {
  const eventsList = data.events || [];

  return (
    <div className={`relative min-h-max flex flex-col items-center justify-start p-8 text-center bg-[#1a1a1a] overflow-hidden pb-20 ${data.fontClass}`}>
      
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      ></div>

      <div className="relative z-10 w-full max-w-sm border border-gray-600 p-8 bg-[#222] bg-opacity-80 backdrop-blur-sm shadow-2xl transition-all duration-700">
        
        {data.heroImage && (
          <div className="w-full h-48 mb-8 overflow-hidden grayscale contrast-125 border border-gray-600">
            <img src={data.heroImage} alt="Pre-wedding" className="w-full h-full object-cover mix-blend-luminosity" />
          </div>
        )}

        <div className="mb-10 border-b border-gray-700 pb-8">
          <p className="text-[9px] tracking-[0.3em] text-gray-500 uppercase mb-4">With blessings from</p>
          <p className="text-sm text-[#d1cfcb]">{data.groomParents || "Groom's Parents"}</p>
          <p className={`text-xs my-1 ${data.colorClasses.split(' ')[0]}`}>&</p>
          <p className="text-sm text-[#d1cfcb]">{data.brideParents || "Bride's Parents"}</p>
        </div>

        <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-8">Join us to celebrate</p>
        <h1 className="text-5xl text-[#e8e6e1] mb-2">{data.bride || 'Bride'}</h1>
        <p className={`text-xl italic mb-2 ${data.colorClasses.split(' ')[0]}`}>and</p>
        <h1 className="text-5xl text-[#e8e6e1] mb-10">{data.groom || 'Groom'}</h1>
        
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto mb-10"></div>
        
        {eventsList.length > 0 ? (
          <div className="space-y-10">
            <p className="text-[10px] tracking-[0.3em] text-gray-500 uppercase">Itinerary</p>
            {eventsList.map((evt, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <h3 className={`text-3xl mb-2 ${data.colorClasses.split(' ')[0]}`}>{evt.type}</h3>
                <p className="text-sm text-[#e8e6e1] tracking-widest">{evt.date}</p>
                <p className="text-xs text-gray-400 mt-1">{evt.time}</p>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 mt-2 border border-gray-700 px-3 py-1">{evt.venue}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p className="text-lg text-[#d1cfcb] tracking-wide mb-2">{data.date || 'Date TBD'}</p>
            <p className="text-xs text-gray-500 tracking-wider uppercase">{data.venue || 'Venue TBD'}</p>
          </div>
        )}

      </div>
    </div>
  );
}