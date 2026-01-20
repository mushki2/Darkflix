
import React, { useState, useEffect, useRef } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { Link, useLocation } = ReactRouterDOM;
import { mockSupabase } from '../lib/supabase';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMail, setShowMail] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    setUser(mockSupabase.auth.getUser().data.user);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Top Header */}
      <nav className={`md:hidden fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#141414]' : 'bg-transparent bg-gradient-to-b from-black/60 to-transparent'}`}>
        <div className="flex items-center justify-between px-4 py-3 gap-3">
          <div className="relative">
            <button 
              onClick={() => { setShowNotifications(!showNotifications); setShowMail(false); }}
              className="relative text-yellow-500 text-xl active:scale-90 transition"
            >
              <i className="fa-solid fa-bell"></i>
              <span className="absolute -top-1 -right-1 bg-red-600 text-[8px] text-white w-3 h-3 flex items-center justify-center rounded-full border border-black font-bold">1</span>
            </button>
            {showNotifications && (
              <div className="absolute top-10 left-0 w-64 bg-[#181818] border border-white/10 rounded-xl shadow-2xl p-4 z-[60] animate-in fade-in slide-in-from-top-2">
                 <h4 className="text-xs font-black uppercase mb-3 text-gray-500">Notifications</h4>
                 <div className="flex gap-3 items-center bg-white/5 p-2 rounded-lg">
                    <i className="fa-solid fa-circle-info text-blue-400"></i>
                    <p className="text-[10px] text-gray-300">Welcome to DarkFlix! Your account is active.</p>
                 </div>
              </div>
            )}
          </div>
          
          <div className="flex-1 flex items-center bg-white/10 backdrop-blur-md rounded-lg px-3 py-1.5 gap-2 border border-white/10">
            <i className="fa-solid fa-magnifying-glass text-gray-400 text-sm"></i>
            <input 
              type="text" 
              placeholder="Search content..." 
              className="bg-transparent border-none outline-none text-xs w-full text-white placeholder-gray-400" 
            />
          </div>

          <div className="relative">
            <button 
              onClick={() => { setShowMail(!showMail); setShowNotifications(false); }}
              className="relative text-yellow-500 text-xl active:scale-90 transition"
            >
              <i className="fa-solid fa-envelope"></i>
              <span className="absolute -top-1 -right-1 bg-red-600 text-[8px] text-white w-3 h-3 flex items-center justify-center rounded-full border border-black font-bold">1</span>
            </button>
            {showMail && (
              <div className="absolute top-10 right-0 w-64 bg-[#181818] border border-white/10 rounded-xl shadow-2xl p-4 z-[60] animate-in fade-in slide-in-from-top-2">
                 <h4 className="text-xs font-black uppercase mb-3 text-gray-500">Mail Center</h4>
                 <div className="flex gap-3 items-center bg-white/5 p-2 rounded-lg">
                    <i className="fa-solid fa-user-shield text-red-500"></i>
                    <div>
                      <p className="text-[10px] font-bold text-white">System Admin</p>
                      <p className="text-[9px] text-gray-400">Stranger Things 5 is now streaming LIVE!</p>
                    </div>
                 </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Desktop Top Header */}
      <nav className="hidden md:flex fixed top-0 w-full h-[64px] bg-[#121212]/95 backdrop-blur-md z-[100] border-b border-white/5 items-center justify-between px-8">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-white text-xl font-black tracking-tighter uppercase">DARKFLIX</Link>
          <div className="flex gap-6 ml-8 text-xs font-black uppercase text-gray-400">
            <Link to="/category/movie" className="hover:text-white transition">Movies</Link>
            <Link to="/category/tv" className="hover:text-white transition">TV Shows</Link>
            <Link to="/category/anime" className="hover:text-white transition">Anime</Link>
          </div>
        </div>
        
        <div className="flex-1 max-w-2xl mx-12 flex items-center bg-[#252525] rounded-md px-4 py-1.5 group border border-transparent focus-within:border-green-500 transition shadow-inner">
          <i className="fa-solid fa-magnifying-glass text-gray-500 text-sm mr-2 group-focus-within:text-green-500"></i>
          <input 
            type="text" 
            placeholder="Search movies, TV shows, and novels..." 
            className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-gray-500"
          />
        </div>

        <div className="flex items-center gap-6">
          <button className="bg-[#00D094] hover:bg-[#00B07E] text-black text-xs font-black uppercase px-4 py-2 rounded-md flex items-center gap-2 transition shadow-lg active:scale-95">
            <i className="fa-solid fa-mobile-screen-button"></i>
            Download App
          </button>
          <Link to="/profile" className="hover:scale-110 transition">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'guest'}`} className="w-8 h-8 rounded-full bg-gray-800 border border-white/10" alt="Profile" />
          </Link>
        </div>
      </nav>
      
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#121212]/95 backdrop-blur-lg border-t border-white/5 flex justify-around items-center py-2 px-1 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
        <Link to="/" className={`flex flex-col items-center gap-1 w-1/5 transition-all ${isActive('/') ? 'text-green-500 scale-110' : 'text-gray-400'}`}>
          <i className="fa-solid fa-house-chimney text-xl"></i>
          <span className="text-[9px] font-bold uppercase tracking-tighter">Home</span>
        </Link>
        
        <Link to="/novels" className={`flex flex-col items-center gap-1 w-1/5 relative transition-all ${isActive('/novels') ? 'text-green-500 scale-110' : 'text-gray-400'}`}>
          <i className="fa-solid fa-book-open text-xl"></i>
          <span className="text-[9px] font-bold uppercase tracking-tighter">NovelHub</span>
          <span className="absolute -top-1 right-2 bg-red-600 text-[6px] text-white px-1 rounded-sm font-black shadow-lg">HOT</span>
        </Link>
        
        <Link to="/shorts" className="flex flex-col items-center -mt-8 bg-[#121212] rounded-full p-1 w-1/5 relative">
          <div className="bg-gradient-to-tr from-pink-500 to-red-500 rounded-full w-14 h-14 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.4)] border-2 border-[#121212] overflow-hidden active:scale-90 transition">
             <img src="https://api.dicebear.com/7.x/micah/svg?seed=buzz" className="w-10 h-10 object-cover" alt="BuzzBox" />
          </div>
          <span className="text-[9px] mt-1 text-gray-400 font-bold uppercase tracking-tighter">BuzzBox</span>
        </Link>

        <Link to="/downloads" className={`flex flex-col items-center gap-1 w-1/5 transition-all ${isActive('/downloads') ? 'text-green-500 scale-110' : 'text-gray-400'}`}>
          <i className="fa-solid fa-circle-down text-xl"></i>
          <span className="text-[9px] font-bold uppercase tracking-tighter">Downloads</span>
        </Link>
        
        <Link to="/profile" className={`flex flex-col items-center gap-1 w-1/5 transition-all ${isActive('/profile') ? 'text-green-500 scale-110' : 'text-gray-400'}`}>
          <i className="fa-solid fa-user-ninja text-xl"></i>
          <span className="text-[9px] font-bold uppercase tracking-tighter">Me</span>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
