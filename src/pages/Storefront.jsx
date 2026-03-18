import { Link } from 'react-router-dom';

export default function Storefront() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50">
      <h1 className="text-6xl font-bold text-gray-900 mb-4 tracking-tight">Envyte.</h1>
      <p className="text-xl text-gray-600 mb-8 font-light">Premium wedding invites, instantly yours.</p>
      <Link 
        to="/editor/classic-theme" 
        className="px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all shadow-lg hover:scale-105"
      >
        Customise Your Invite
      </Link>
    </div>
  );
}