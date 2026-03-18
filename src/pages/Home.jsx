import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0c] text-white overflow-hidden flex flex-col items-center justify-center font-sans">
      
      {/* --- PREMIUM FONTS & ANIMATIONS --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }

        @keyframes float-1 {
          0%, 100% { transform: translateY(0) rotate(-6deg) scale(1); }
          50% { transform: translateY(-15px) rotate(-4deg) scale(1.02); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0) rotate(8deg) scale(1); }
          50% { transform: translateY(-20px) rotate(10deg) scale(1.02); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0) rotate(-12deg) scale(1); }
          50% { transform: translateY(-10px) rotate(-10deg) scale(1.02); }
        }
        @keyframes float-4 {
          0%, 100% { transform: translateY(0) rotate(15deg) scale(1); }
          50% { transform: translateY(-25px) rotate(12deg) scale(1.02); }
        }
      `}</style>

      {/* --- AMBIENT BACKGROUND GLOWS (Softer) --- */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-rose-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* --- FLOATING TEMPLATE MOCKUPS (Resized and Pushed Inward) --- */}
      
      {/* Top Left */}
      <div 
        className="absolute top-[10%] md:top-[12%] left-[4%] md:left-[12%] w-[140px] h-[280px] md:w-[200px] md:h-[400px] rounded-[2rem] border-[4px] border-[#222] bg-gray-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden opacity-50 hover:opacity-100 transition-opacity duration-700 z-0 hidden sm:block"
        style={{ animation: 'float-1 8s ease-in-out infinite' }}
      >
        <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=400" alt="Royal Template" className="w-full h-full object-cover opacity-90" />
        {/* Inner glass rim for depth */}
        <div className="absolute inset-0 border-[4px] border-black/20 rounded-[1.8rem] pointer-events-none"></div>
      </div>

      {/* Bottom Right */}
      <div 
        className="absolute bottom-[10%] md:bottom-[12%] right-[4%] md:right-[12%] w-[150px] h-[300px] md:w-[220px] md:h-[440px] rounded-[2rem] border-[4px] border-[#222] bg-gray-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden opacity-40 hover:opacity-100 transition-opacity duration-700 z-0 hidden sm:block"
        style={{ animation: 'float-2 9s ease-in-out infinite' }}
      >
        <img src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=400" alt="Kashmir Template" className="w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 border-[4px] border-black/20 rounded-[1.8rem] pointer-events-none"></div>
      </div>

      {/* Top Right */}
      <div 
        className="absolute top-[15%] md:top-[18%] right-[8%] md:right-[18%] w-[120px] h-[240px] md:w-[160px] md:h-[320px] rounded-[1.5rem] border-[3px] border-[#222] bg-gray-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden opacity-30 hover:opacity-100 transition-opacity duration-700 z-0 hidden lg:block"
        style={{ animation: 'float-3 7s ease-in-out infinite' }}
      >
        <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=400" alt="Paris Template" className="w-full h-full object-cover opacity-90" />
      </div>

      {/* Bottom Left */}
      <div 
        className="absolute bottom-[15%] md:bottom-[18%] left-[8%] md:left-[18%] w-[130px] h-[260px] md:w-[180px] md:h-[360px] rounded-[1.5rem] border-[3px] border-[#222] bg-gray-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden opacity-30 hover:opacity-100 transition-opacity duration-700 z-0 hidden lg:block"
        style={{ animation: 'float-4 10s ease-in-out infinite' }}
      >
        <img src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=400" alt="Kerala Template" className="w-full h-full object-cover opacity-90" />
      </div>

      {/* --- MAIN CENTER CONTENT --- */}
      {/* Added py-24 to force top/bottom padding so icons never hit the floor */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 py-24 max-w-4xl mx-auto min-h-screen justify-center">
        
        <div className="inline-block mb-8 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg">
          <p className="text-[11px] font-semibold tracking-[0.25em] text-amber-400 uppercase">Premium Digital Invites</p>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 text-white drop-shadow-2xl leading-[1.1] tracking-tight">
          The Wedding Invite, <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 italic pr-4">
            Reinvented.
          </span>
        </h1>
        
        <p className="text-base md:text-lg lg:text-xl text-gray-400 font-sans font-light mb-12 max-w-2xl mx-auto leading-relaxed">
          Mobile-first, effortless to share. Costs less than printed cards, but feels far more premium. Build your gorgeous digital invite in 10 minutes.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 mb-16">
          <Link 
            to="/editor" 
            className="px-8 py-4 bg-white text-black rounded-full font-bold font-sans text-sm tracking-wide hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-300"
          >
            Customise Your Invite ✨
          </Link>
          <Link 
            to="/dashboard" 
            className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold font-sans text-sm tracking-wide hover:bg-white/10 hover:border-white/40 transition-all duration-300"
          >
            View Dashboard
          </Link>
        </div>

        {/* Feature Icons - Added mt-auto to push them cleanly to the bottom of the padded area */}
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 pt-8 mt-auto">
           <div className="flex flex-col items-center gap-3">
              <span className="text-3xl">🌍</span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-300">Smart Maps</span>
           </div>
           <div className="flex flex-col items-center gap-3">
              <span className="text-3xl">📱</span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-300">Mobile First</span>
           </div>
           <div className="flex flex-col items-center gap-3">
              <span className="text-3xl">⚡</span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-300">Instant Edits</span>
           </div>
        </div>

      </div>
    </div>
  );
}