
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDB } from '../store/mockData';
import { ContentType } from '../types';
import MovieCard from '../components/MovieCard';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const db = useMemo(() => getDB(), []);

  const filteredItems = useMemo(() => {
    const cat = categoryId?.toLowerCase();
    if (cat === 'hollywood') return db.filter(i => i.region === 'Hollywood');
    if (cat === 'nollywood') return db.filter(i => i.region === 'Nollywood');
    if (cat === 'bollywood') return db.filter(i => i.region === 'Bollywood');
    if (cat === 'movie') return db.filter(i => i.type === ContentType.MOVIE);
    if (cat === 'tv') return db.filter(i => i.type === ContentType.SERIES);
    if (cat === 'anime') return db.filter(i => i.type === ContentType.ANIME);
    return db;
  }, [db, categoryId]);

  const bannerImg = useMemo(() => {
    if (categoryId === 'hollywood') return 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200';
    if (categoryId === 'nollywood') return 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200';
    if (categoryId === 'bollywood') return 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1200';
    return 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200';
  }, [categoryId]);

  return (
    <div className="min-h-screen bg-[#121212] pt-16">
      {/* Banner */}
      <div className="relative h-[30vh] md:h-[40vh] w-full">
        <img src={bannerImg} className="w-full h-full object-cover brightness-[0.4]" alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent"></div>
        <div className="absolute bottom-8 left-8">
           <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white drop-shadow-2xl">
             {categoryId}
           </h1>
           <p className="text-gray-400 mt-2 font-bold uppercase tracking-widest text-sm">Discover the best of {categoryId}</p>
        </div>
      </div>

      <div className="px-4 md:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold border-l-4 border-green-500 pl-4 uppercase">All Collections</h2>
          <div className="flex gap-2">
            <button className="bg-white/5 p-2 rounded-lg text-xs font-bold"><i className="fa-solid fa-filter"></i> Filter</button>
            <button className="bg-white/5 p-2 rounded-lg text-xs font-bold"><i className="fa-solid fa-sort"></i> Sort</button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="w-full">
              <MovieCard item={item} />
              <div className="mt-2 text-center text-[10px] text-gray-500 font-bold uppercase">
                {item.views.toLocaleString()} Views
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-600">
               <i className="fa-solid fa-box-open text-4xl mb-4"></i>
               <p>No content found in this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
