
import React, { useMemo, useState, useEffect } from 'react';
import { getDB, UPCOMING_CALENDAR, addDownload } from '../store/mockData';
import { ContentType, ContentItem } from '../types';
import MovieCard from '../components/MovieCard';
import * as ReactRouterDOM from 'react-router-dom';
const { Link } = ReactRouterDOM;

const Home: React.FC = () => {
  const db = useMemo(() => getDB(), []);
  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);
  
  const trending = useMemo(() => [...db].sort((a, b) => b.views - a.views).slice(0, 10), [db]);
  const movies = useMemo(() => db.filter(i => i.type === ContentType.MOVIE), [db]);
  const bestOf2025 = useMemo(() => db.filter(i => i.year === 2025), [db]);
  const anime = useMemo(() => db.filter(i => i.type === ContentType.ANIME), [db]);
  
  const featured = trending[currentHeroIdx];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIdx(prev => (prev + 1) % trending.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [trending.length]);

  const navLinks = [
    { label: 'Movie', path: '/category/movie' },
    { label: 'TV', path: '/category/tv' },
    { label: 'Anime', path: '/category/anime' },
    { label: 'ShortTV', path: '/shorts' }
  ];

  const regionalCategories = [
    { label: 'Hollywood', path: '/category/hollywood', img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400' },
    { label: 'Nollywood', path: '/category/nollywood', img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400' },
    { label: 'Bollywood', path: '/category/bollywood', img: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=400' }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* --- MOBILE VIEW --- */}
      <div className="md:hidden pb-24">
        {/* Navigation Tabs */}
        <div className="pt-20 px-4 flex items-center gap-6 overflow-x-auto scrollbar-hide text-gray-400 font-medium whitespace-nowrap z-40 relative">
          <button className="text-xl font-black flex items-center gap-2 text-white">
             <i className="fa-solid fa-clapperboard text-green-500 animate-pulse"></i> LIVE
          </button>
          {navLinks.map(link => (
            <Link key={link.label} to={link.path} className="text-sm font-bold uppercase tracking-tighter hover:text-white transition">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Hero Section */}
        {featured && (
          <section className="relative h-[65vh] w-full mt-4 px-2">
            <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl border border-white/5">
              <img src={featured.poster_url} alt={featured.title} className="w-full h-full object-cover brightness-[0.7]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              
              <div className="absolute inset-x-0 bottom-4 p-4">
                 <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-4 rounded-2xl flex gap-4 items-center shadow-2xl">
                    <div className="relative">
                      <img src={featured.poster_url} className="w-14 h-20 object-cover rounded-lg shadow-lg" alt="poster" />
                      {featured.is_live && <div className="absolute -top-1 -right-1 bg-red-600 text-[6px] text-white px-1 rounded-sm font-black animate-pulse">LIVE</div>}
                    </div>
                    <div className="flex-1 min-w-0 text-white">
                       <h2 className="text-lg font-black truncate uppercase tracking-tighter">{featured.title}</h2>
                       <p className="text-[10px] opacity-70 mt-1 uppercase">
                          {featured.region} | {featured.year} | {featured.genre}
                       </p>
                    </div>
                    <Link 
                      to={`/watch/${featured.id}`}
                      className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg active:scale-90 transition"
                    >
                      <i className="fa-solid fa-play"></i>
                    </Link>
                 </div>
              </div>
            </div>
          </section>
        )}

        {/* Regional Categories Section (Visual Grid) */}
        <section className="px-4 mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-500">Regional Collections</h3>
            <button className="text-[10px] font-black text-gray-500 uppercase">View All</button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {regionalCategories.map((cat) => (
              <Link key={cat.label} to={cat.path} className="relative aspect-video rounded-xl overflow-hidden group border border-white/5 shadow-lg">
                <img src={cat.img} className="w-full h-full object-cover brightness-[0.4] group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[9px] font-black uppercase tracking-widest text-white drop-shadow-lg">{cat.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Content Rows */}
        <div className="px-4 mt-10 space-y-12">
          <section>
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-black uppercase tracking-tighter text-white">Trending Now 🔥</h2>
               <Link to="/category/all" className="text-[10px] font-black text-gray-500 flex items-center gap-1 uppercase">See All <i className="fa-solid fa-chevron-right"></i></Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {trending.map(item => <MovieCard key={item.id} item={item} />)}
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-black uppercase tracking-tighter text-white">Best of 2025 🏆</h2>
               <Link to="/category/movie" className="text-[10px] font-black text-gray-500 flex items-center gap-1 uppercase">Explore <i className="fa-solid fa-chevron-right"></i></Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {bestOf2025.map(item => <MovieCard key={item.id} item={item} />)}
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-black uppercase tracking-tighter text-white">Top Anime 🌸</h2>
               <Link to="/category/anime" className="text-[10px] font-black text-gray-500 flex items-center gap-1 uppercase">Watch <i className="fa-solid fa-chevron-right"></i></Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {anime.map(item => <MovieCard key={item.id} item={item} />)}
            </div>
          </section>
        </div>
      </div>

      {/* --- DESKTOP VIEW --- */}
      <div className="hidden md:block pt-[64px] px-8 max-w-[1600px] mx-auto pb-24">
        {/* Desktop Carousel */}
        <section className="relative h-[550px] w-full mt-4 group">
          <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-inner-lg bg-black">
            {trending.slice(0, 5).map((item, idx) => (
              <div key={item.id} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === (currentHeroIdx % 5) ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                <img src={item.poster_url} className="w-full h-full object-cover object-top brightness-[0.5]" alt={item.title} />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
                <div className="absolute left-16 bottom-16 max-w-2xl space-y-6">
                   <div className="flex items-center gap-4">
                      <span className="text-8xl font-black text-white/10 stroke-white stroke-2 italic select-none">#{idx + 1}</span>
                      <div>
                        {item.is_live && <div className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm mb-1 inline-block uppercase tracking-widest animate-pulse">LIVE NOW</div>}
                        <h1 className="text-6xl font-black text-white uppercase tracking-tighter leading-none">{item.title}</h1>
                      </div>
                   </div>
                   <p className="text-gray-300 text-xl line-clamp-2 italic">"{item.description}"</p>
                   <div className="flex gap-4">
                      <Link to={`/watch/${item.id}`} className="bg-green-500 hover:bg-green-600 text-black font-black px-10 py-4 rounded-xl flex items-center gap-3 transition transform hover:scale-105">
                         <i className="fa-solid fa-play"></i> Watch Now
                      </Link>
                      <button onClick={() => addDownload(item)} className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold px-10 py-4 rounded-xl flex items-center gap-3 transition">
                         <i className="fa-solid fa-download"></i> Download
                      </button>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Desktop Rows */}
        <div className="mt-16 space-y-20">
          <section>
            <h2 className="text-2xl font-black tracking-tight text-white mb-8 border-l-4 border-green-500 pl-6 uppercase">Trending Now 🔥</h2>
            <div className="grid grid-cols-6 gap-6">
               {trending.slice(0, 6).map(item => <MovieCard key={item.id} item={item} variant="desktop" />)}
            </div>
          </section>

          <section>
             <h2 className="text-2xl font-black tracking-tight text-white mb-8 border-l-4 border-blue-500 pl-6 uppercase">New Releases 2025 ✨</h2>
             <div className="grid grid-cols-6 gap-6">
                {bestOf2025.slice(0, 6).map(item => <MovieCard key={item.id} item={item} variant="desktop" />)}
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
