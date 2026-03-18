import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const TEMPLATE_CATALOG = [
  { 
    id: 'editorial', 
    name: 'The Editorial', 
    category: 'Minimalist & Modern', 
    price: 'INR 249', // Standard pricing
    img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800', 
    theme: 'classic', 
    fontPairing: 'playfair-lato'
  },
  { 
    id: 'archive', 
    name: 'The Archive', 
    category: 'Retro Film / 90s', 
    price: 'INR 249', // Standard pricing
    img: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&q=80&w=800', 
    theme: 'vintage', 
    fontPairing: 'cormorant-montserrat'
  },
  { 
    id: 'palace', 
    name: 'The Palace', 
    category: 'Grand & Traditional', 
    price: 'INR 249', // Standard pricing
    img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800', 
    theme: 'royal', 
    fontPairing: 'cinzel-montserrat'
  },
  { 
    id: 'destination-mountain', 
    name: 'The Destination', 
    category: 'Immersive Scenery', 
    price: 'INR 499', // Premium scenic pricing
    img: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=800', 
    theme: 'location_vibe', 
    bgImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=800',
    fontPairing: 'cormorant-montserrat'
  },
  { 
    id: 'destination-beach', 
    name: 'The Getaway', 
    category: 'Immersive Scenery', 
    price: 'INR 499', // Premium scenic pricing
    img: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800', 
    theme: 'location_vibe', 
    bgImage: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800',
    fontPairing: 'cormorant-montserrat'
  },
  { 
    id: 'romantic', 
    name: 'The Romance', 
    category: 'Soft & Elegant', 
    price: 'INR 249', // Standard pricing
    img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800', 
    theme: 'classic', 
    fontPairing: 'greatvibes-raleway'
  }
];

export default function Templates() {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white font-sans pt-[72px]">
      <Navbar />
      
      {/* Background ambient glow */}
      <div className="fixed top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-serif mb-4 text-white drop-shadow-lg tracking-tight">Curated Designs</h1>
          <p className="text-gray-400 font-sans max-w-xl mx-auto md:mx-0 leading-relaxed">Select a premium template to start building your story. Everything is fully customizable in the studio.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {TEMPLATE_CATALOG.map((tpl) => (
            <div key={tpl.id} className="group flex flex-col cursor-pointer">
              
              {/* Glassmorphism Mockup Card */}
              <div className="relative w-full aspect-[4/3] bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 mb-6 flex flex-col items-center justify-center shadow-2xl group-hover:border-white/30 transition-all duration-500 overflow-hidden">
                <div className="relative w-[90%] aspect-[16/10] bg-black rounded-xl border-[6px] border-[#0a0a0c] shadow-2xl overflow-hidden transform group-hover:-translate-y-3 transition-transform duration-700 z-10">
                   <img src={tpl.img} alt={tpl.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 scale-105 group-hover:scale-100" />
                </div>
                <div className="absolute top-5 left-5 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-[9px] font-bold text-white uppercase tracking-widest border border-white/10 z-20">
                  {tpl.category}
                </div>
              </div>

              {/* Action Footer */}
              <div className="flex justify-between items-end px-2">
                <div>
                  <h3 className="text-2xl font-sans font-bold text-white mb-1 tracking-tight">{tpl.name}</h3>
                  <p className="text-sm text-amber-500 font-medium tracking-widest uppercase">{tpl.price}</p>
                </div>
                {/* Passes chosen template data to Editor via state */}
                <Link 
                  to="/editor" 
                  state={{ selectedTemplate: tpl }}
                  className="px-6 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-xs font-bold tracking-widest uppercase hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all shadow-lg shrink-0"
                >
                  Select
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}