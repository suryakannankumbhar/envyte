import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const TEMPLATE_CATALOG = [
  { 
    id: 'editorial', 
    name: 'The Editorial', 
    category: 'Minimalist & Modern', 
    price: 'INR 249', 
    img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800', 
    theme: 'classic', 
    fontPairing: 'playfair-lato'
  },
  { 
    id: 'archive', 
    name: 'The Archive', 
    category: 'Retro Film / 90s', 
    price: 'INR 249', 
    img: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&q=80&w=800', 
    theme: 'vintage', 
    fontPairing: 'cormorant-montserrat'
  },
  { 
    id: 'palace', 
    name: 'The Palace', 
    category: 'Grand & Traditional', 
    price: 'INR 249', 
    img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800', 
    theme: 'royal', 
    fontPairing: 'cinzel-montserrat'
  },
  { 
    id: 'destination-mountain', 
    name: 'The Destination', 
    category: 'Immersive Scenery', 
    price: 'INR 499', 
    img: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=800', 
    theme: 'location_vibe', 
    bgImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=800',
    fontPairing: 'cormorant-montserrat'
  },
  { 
    id: 'destination-beach', 
    name: 'The Getaway', 
    category: 'Immersive Scenery', 
    price: 'INR 499', 
    img: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800', 
    theme: 'location_vibe', 
    bgImage: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800',
    fontPairing: 'cormorant-montserrat'
  },
  { 
    id: 'romantic', 
    name: 'The Romance', 
    category: 'Soft & Elegant', 
    price: 'INR 249', 
    img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800', 
    theme: 'classic', 
    fontPairing: 'greatvibes-raleway'
  }
];

export default function Home() {
  return (
    // 'h-screen' and 'overflow-hidden' lock it to exactly one viewport height
    <div className="relative h-screen w-full bg-[#050505] text-white overflow-hidden font-sans pt-[72px]">
      <Navbar />
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        @keyframes float-1 { 0%, 100% { transform: translateY(0) rotate(-6deg); } 50% { transform: translateY(-15px) rotate(-4deg); } }
        @keyframes float-2 { 0%, 100% { transform: translateY(0) rotate(8deg); } 50% { transform: translateY(-20px) rotate(10deg); } }
        @keyframes float-3 { 0%, 100% { transform: translateY(0) rotate(-12deg); } 50% { transform: translateY(-10px) rotate(-10deg); } }
        @keyframes float-4 { 0%, 100% { transform: translateY(0) rotate(15deg); } 50% { transform: translateY(-25px) rotate(12deg); } }
      `}</style>

      {/* Ambient Deep Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-rose-500/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Floating Mockups (Using the Palace, Destination, Editorial, and Archive images) */}
      <div className="absolute top-[10%] md:top-[15%] left-[2%] md:left-[10%] w-[120px] h-[240px] md:w-[180px] md:h-[360px] rounded-[1.5rem] border-[2px] border-white/10 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden opacity-50 z-0 hidden sm:block" style={{ animation: 'float-1 8s ease-in-out infinite' }}>
        <img src={TEMPLATE_CATALOG[2].img} alt="Palace" className="w-full h-full object-cover opacity-80" />
      </div>
      <div className="absolute bottom-[10%] md:bottom-[15%] right-[2%] md:right-[10%] w-[130px] h-[260px] md:w-[200px] md:h-[400px] rounded-[1.5rem] border-[2px] border-white/10 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden opacity-40 z-0 hidden sm:block" style={{ animation: 'float-2 9s ease-in-out infinite' }}>
        <img src={TEMPLATE_CATALOG[3].img} alt="Destination" className="w-full h-full object-cover opacity-80" />
      </div>
      <div className="absolute top-[15%] md:top-[18%] right-[8%] md:right-[18%] w-[100px] h-[200px] md:w-[140px] md:h-[280px] rounded-[1.5rem] border-[2px] border-white/10 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden opacity-30 z-0 hidden lg:block" style={{ animation: 'float-3 7s ease-in-out infinite' }}>
        <img src={TEMPLATE_CATALOG[0].img} alt="Editorial" className="w-full h-full object-cover opacity-80" />
      </div>
      <div className="absolute bottom-[15%] md:bottom-[18%] left-[8%] md:left-[18%] w-[110px] h-[220px] md:w-[150px] md:h-[300px] rounded-[1.5rem] border-[2px] border-white/10 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden opacity-30 z-0 hidden lg:block" style={{ animation: 'float-4 10s ease-in-out infinite' }}>
        <img src={TEMPLATE_CATALOG[1].img} alt="Archive" className="w-full h-full object-cover opacity-80" />
      </div>

      {/* Main Center Content vertically centered in the remaining height */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 h-full max-w-4xl mx-auto -mt-8">
        
        <div className="inline-block mb-6 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
          <p className="text-[10px] font-bold tracking-[0.3em] text-amber-500 uppercase">Premium Digital Invites</p>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 text-white drop-shadow-2xl leading-[1.05] tracking-tight">
          The Wedding Invite, <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 italic pr-4">Reinvented.</span>
        </h1>
        
        <p className="text-base md:text-lg text-gray-400 font-sans font-light mb-10 max-w-xl mx-auto leading-relaxed">
          Mobile-first, effortless to share. Costs less than printed cards, but feels far more premium. 
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
          <Link to="/templates" className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold font-sans text-xs tracking-widest uppercase hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300">
            Explore Templates
          </Link>
          <Link to="/editor" className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-full font-bold font-sans text-xs tracking-widest uppercase hover:bg-white/10 hover:border-white/40 transition-all duration-300">
            Studio Editor
          </Link>
        </div>

        {/* Floating bottom features */}
        <div className="absolute bottom-12 flex flex-wrap items-center justify-center gap-12 opacity-50 grayscale">
           <div className="flex flex-col items-center gap-2"><span className="text-2xl">🌍</span><span className="text-[9px] uppercase tracking-[0.25em] font-medium text-gray-300">Smart Maps</span></div>
           <div className="flex flex-col items-center gap-2"><span className="text-2xl">📱</span><span className="text-[9px] uppercase tracking-[0.25em] font-medium text-gray-300">Mobile First</span></div>
           <div className="flex flex-col items-center gap-2"><span className="text-2xl">⚡</span><span className="text-[9px] uppercase tracking-[0.25em] font-medium text-gray-300">Instant Edits</span></div>
        </div>

      </div>
    </div>
  );
}