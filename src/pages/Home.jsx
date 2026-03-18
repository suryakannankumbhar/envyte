import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // <-- IMPORT NAVBAR

const TEMPLATES = [
  { id: 'city', name: 'City', category: 'Hindu Weddings', price: 'INR 3999', img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800' },
  { id: 'beach', name: 'Beach', category: 'Hindu Weddings', price: 'INR 3999', img: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800' },
  { id: 'mountain', name: 'Mountain', category: 'Hindu Weddings', price: 'INR 3999', img: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=800' },
  { id: 'meenaya', name: 'Meenaya', category: 'South Indian Weddings', price: 'INR 3999', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800' },
  { id: 'laavan', name: 'Laavan', category: 'Sikh Weddings', price: 'INR 3999', img: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&q=80&w=800' },
  { id: 'raabta', name: 'Raabta', category: 'Muslim Weddings', price: 'INR 3999', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800' }
];

export default function Home() {
  return (
    <div className="relative w-full bg-[#0a0a0c] text-white overflow-x-hidden font-sans pt-[72px]">
      <Navbar /> {/* <-- RENDER NAVBAR */}
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        @keyframes float-1 { 0%, 100% { transform: translateY(0) rotate(-6deg); } 50% { transform: translateY(-15px) rotate(-4deg); } }
        @keyframes float-2 { 0%, 100% { transform: translateY(0) rotate(8deg); } 50% { transform: translateY(-20px) rotate(10deg); } }
        @keyframes float-3 { 0%, 100% { transform: translateY(0) rotate(-12deg); } 50% { transform: translateY(-10px) rotate(-10deg); } }
        @keyframes float-4 { 0%, 100% { transform: translateY(0) rotate(15deg); } 50% { transform: translateY(-25px) rotate(12deg); } }
      `}</style>

      {/* SECTION 1: THE HERO */}
      <div className="relative min-h-[calc(100vh-72px)] flex flex-col items-center justify-center pb-32">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-rose-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="absolute top-[10%] md:top-[12%] left-[4%] md:left-[12%] w-[140px] h-[280px] md:w-[200px] md:h-[400px] rounded-[2rem] border-[4px] border-[#222] bg-gray-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden opacity-50 z-0 hidden sm:block" style={{ animation: 'float-1 8s ease-in-out infinite' }}>
          <img src={TEMPLATES[0].img} alt="City" className="w-full h-full object-cover opacity-90" />
          <div className="absolute inset-0 border-[4px] border-black/20 rounded-[1.8rem] pointer-events-none"></div>
        </div>
        <div className="absolute bottom-[10%] md:bottom-[12%] right-[4%] md:right-[12%] w-[150px] h-[300px] md:w-[220px] md:h-[440px] rounded-[2rem] border-[4px] border-[#222] bg-gray-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden opacity-40 z-0 hidden sm:block" style={{ animation: 'float-2 9s ease-in-out infinite' }}>
          <img src={TEMPLATES[2].img} alt="Mountain" className="w-full h-full object-cover opacity-90" />
          <div className="absolute inset-0 border-[4px] border-black/20 rounded-[1.8rem] pointer-events-none"></div>
        </div>
        <div className="absolute top-[15%] md:top-[18%] right-[8%] md:right-[18%] w-[120px] h-[240px] md:w-[160px] md:h-[320px] rounded-[1.5rem] border-[3px] border-[#222] bg-gray-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden opacity-30 z-0 hidden lg:block" style={{ animation: 'float-3 7s ease-in-out infinite' }}>
          <img src={TEMPLATES[5].img} alt="Raabta" className="w-full h-full object-cover opacity-90" />
        </div>
        <div className="absolute bottom-[15%] md:bottom-[18%] left-[8%] md:left-[18%] w-[130px] h-[260px] md:w-[180px] md:h-[360px] rounded-[1.5rem] border-[3px] border-[#222] bg-gray-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden opacity-30 z-0 hidden lg:block" style={{ animation: 'float-4 10s ease-in-out infinite' }}>
          <img src={TEMPLATES[3].img} alt="Meenaya" className="w-full h-full object-cover opacity-90" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-4xl mx-auto pt-10">
          <div className="inline-block mb-8 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg">
            <p className="text-[11px] font-semibold tracking-[0.25em] text-amber-400 uppercase">Premium Digital Invites</p>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 text-white drop-shadow-2xl leading-[1.1] tracking-tight">
            The Wedding Invite, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 italic pr-4">Reinvented.</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-400 font-sans font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Mobile-first, effortless to share. Costs less than printed cards, but feels far more premium. Build your gorgeous digital invite in 10 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-16">
            <Link to="/editor" className="px-8 py-4 bg-white text-black rounded-full font-bold font-sans text-sm tracking-wide hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-300">
              Customise Your Invite ✨
            </Link>
            <Link to="/dashboard" className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold font-sans text-sm tracking-wide hover:bg-white/10 hover:border-white/40 transition-all duration-300">
              View Dashboard
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-50 grayscale pt-8 mt-auto">
             <div className="flex flex-col items-center gap-3"><span className="text-3xl">🌍</span><span className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-300">Smart Maps</span></div>
             <div className="flex flex-col items-center gap-3"><span className="text-3xl">📱</span><span className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-300">Mobile First</span></div>
             <div className="flex flex-col items-center gap-3"><span className="text-3xl">⚡</span><span className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-300">Instant Edits</span></div>
          </div>
        </div>
      </div>

      {/* SECTION 2: PRODUCT GRID */}
      <div className="relative z-20 bg-[#121214] border-t border-white/10 text-white py-24 px-6 md:px-12 lg:px-24 rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-white">Choose a Template</h2>
            <p className="text-gray-400 font-sans max-w-xl text-sm leading-relaxed">Perfect for all weddings — effortless to edit, easy to share. Designed to feel completely yours.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {TEMPLATES.map((template) => (
              <div key={template.id} className="group flex flex-col cursor-pointer">
                <div className="relative w-full aspect-[4/3] bg-[#1a1a1c] border border-white/10 rounded-3xl p-4 md:p-6 mb-6 flex flex-col items-center justify-center shadow-sm group-hover:border-white/20 transition-all duration-500 overflow-hidden">
                  <div className="relative w-[95%] aspect-[16/10] bg-black rounded-lg border-[6px] md:border-[8px] border-[#0a0a0c] shadow-2xl overflow-hidden transform group-hover:-translate-y-2 transition-transform duration-500 z-10">
                     <img src={template.img} alt={template.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="w-[100%] h-2 bg-[#333] rounded-b-xl z-0 transform group-hover:-translate-y-2 transition-transform duration-500 mt-[-2px]"></div>

                  <div className="absolute top-5 left-5 right-5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <span className="px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-full text-[9px] font-bold text-white uppercase tracking-widest border border-white/10">
                      {template.category}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-end px-2">
                  <div className="pr-4">
                    <h3 className="text-xl md:text-2xl font-sans font-bold text-white mb-1">{template.name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-[280px]">
                      Perfect for {template.category.toLowerCase()} — effortless to edit, share.
                    </p>
                  </div>
                  <div className="px-4 py-2 bg-amber-500 text-black rounded-full text-[10px] md:text-xs font-bold tracking-widest shrink-0">
                    {template.price}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 flex justify-center">
             <Link to="/editor" className="px-10 py-4 border-2 border-white/20 text-white text-sm tracking-widest font-bold rounded-full hover:bg-white hover:text-black transition-colors">
               Explore Editor
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}