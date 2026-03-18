export default function ClassicTemplate({ data }) {
  const eventsList = data.events || [];

  return (
    <div className={`min-h-max bg-rose-50 flex flex-col items-center justify-start p-6 text-center pb-20 ${data.fontClass}`}>
      <div className={`border-4 p-8 rounded-2xl shadow-xl max-w-sm w-full overflow-hidden ${data.colorClasses}`}>
        
        {data.heroImage && (
          <div className="w-full h-48 mb-8 rounded-xl overflow-hidden shadow-sm">
            <img src={data.heroImage} alt="Pre-wedding" className="w-full h-full object-cover" />
          </div>
        )}

        <div className="mb-8 border-b pb-8 border-opacity-20 border-current">
          <p className="text-[10px] tracking-[0.2em] uppercase mb-4 font-semibold opacity-70">With blessings from</p>
          <p className="text-sm font-medium">{data.groomParents || "Groom's Parents"}</p>
          <p className="text-xs my-1 opacity-60">&</p>
          <p className="text-sm font-medium">{data.brideParents || "Bride's Parents"}</p>
        </div>

        <p className="text-xs tracking-[0.2em] uppercase mb-4 font-semibold opacity-80">
          Invite you to the wedding of
        </p>
        
        <h1 className="text-5xl font-serif mb-2">{data.bride || 'Bride'}</h1>
        <p className="text-xl italic mb-2 opacity-80">and</p>
        <h1 className="text-5xl font-serif mb-8">{data.groom || 'Groom'}</h1>
        
        <div className="w-16 h-[1px] bg-current opacity-30 mx-auto mb-8"></div>

        {eventsList.length > 0 ? (
          <div className="space-y-8">
            <p className="text-xs tracking-[0.2em] uppercase mb-6 font-semibold opacity-80">Itinerary</p>
            {eventsList.map((evt, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <h3 className="text-2xl font-serif mb-2">{evt.type}</h3>
                <p className="text-sm font-medium opacity-90">{evt.date}</p>
                <p className="text-xs opacity-70 mb-1">{evt.time}</p>
                <p className="text-xs opacity-70 italic">{evt.venue}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p className="text-lg font-medium mb-1">{data.date || 'Date TBD'}</p>
            <p className="text-sm opacity-80">{data.venue || 'Venue TBD'}</p>
          </div>
        )}

      </div>
    </div>
  );
}