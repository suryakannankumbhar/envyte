export default function RoyalTemplate({ data }) {
  const eventsList = data.events || [];

  return (
    <div className={`min-h-max flex flex-col items-center justify-start p-4 bg-[#fdfbf7] pb-20 ${data.fontClass}`}>
      <div className={`w-full max-w-sm border-double border-[12px] p-6 text-center bg-white shadow-xl relative ${data.colorClasses.split(' ')[1]}`}>
        
        <div className={`absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 ${data.colorClasses.split(' ')[1]}`}></div>
        <div className={`absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 ${data.colorClasses.split(' ')[1]}`}></div>
        <div className={`absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 ${data.colorClasses.split(' ')[1]}`}></div>
        <div className={`absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 ${data.colorClasses.split(' ')[1]}`}></div>

        {data.heroImage && (
          <div className={`w-28 h-28 mx-auto mb-8 rounded-full overflow-hidden border-4 ${data.colorClasses.split(' ')[1]}`}>
            <img src={data.heroImage} alt="Pre-wedding" className="w-full h-full object-cover" />
          </div>
        )}

        <div className={`mb-8 border-b-2 border-dotted pb-6 ${data.colorClasses.split(' ')[1]}`}>
          <p className={`text-[10px] tracking-[0.2em] uppercase mb-4 font-semibold ${data.colorClasses.split(' ')[0]}`}>With the blessings of</p>
          <p className="text-sm text-gray-800 font-medium">{data.groomParents || "Groom's Parents"}</p>
          <p className={`text-xs my-1 italic ${data.colorClasses.split(' ')[0]}`}>&</p>
          <p className="text-sm text-gray-800 font-medium">{data.brideParents || "Bride's Parents"}</p>
        </div>

        <p className={`text-[10px] tracking-[0.2em] uppercase mb-4 font-semibold ${data.colorClasses.split(' ')[0]}`}>
          Together with their families
        </p>

        <h1 className="text-5xl text-gray-900 mb-2 mt-4">{data.bride || 'Bride'}</h1>
        <p className={`text-xl italic mb-2 ${data.colorClasses.split(' ')[0]}`}>weds</p>
        <h1 className="text-5xl text-gray-900 mb-8">{data.groom || 'Groom'}</h1>
        
        <div className={`w-32 h-[2px] mx-auto mb-10 ${data.colorClasses.split(' ')[2].replace('bg-', 'bg-')}`}></div>

        {eventsList.length > 0 ? (
          <div className="space-y-6">
            <p className={`text-[10px] tracking-[0.2em] uppercase font-semibold ${data.colorClasses.split(' ')[0]}`}>Itinerary</p>
            {eventsList.map((evt, idx) => (
              <div key={idx} className={`border border-current p-4 relative ${data.colorClasses.split(' ')[1]}`}>
                {/* Decorative dots for the event cards */}
                <div className={`absolute -top-1 -left-1 w-2 h-2 rounded-full ${data.colorClasses.split(' ')[2]}`}></div>
                <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${data.colorClasses.split(' ')[2]}`}></div>
                <div className={`absolute -bottom-1 -left-1 w-2 h-2 rounded-full ${data.colorClasses.split(' ')[2]}`}></div>
                <div className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full ${data.colorClasses.split(' ')[2]}`}></div>
                
                <h3 className="text-2xl text-gray-900 mb-2">{evt.type}</h3>
                <p className="text-sm text-gray-700 font-medium">{evt.date}</p>
                <p className="text-xs text-gray-600 mb-2">{evt.time}</p>
                <p className="text-[11px] text-gray-500 uppercase tracking-widest">{evt.venue}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p className="text-lg text-gray-800 font-medium mb-1">{data.date || 'Date TBD'}</p>
            <p className="text-sm text-gray-600">{data.venue || 'Venue TBD'}</p>
          </div>
        )}

      </div>
    </div>
  );
}