
import React from 'react';
import { MOCK_NOVELS } from '../store/mockData';

const NovelHub: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#121212] pt-20 pb-24 px-4 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <i className="fa-solid fa-book-open text-red-600"></i> NovelHub
        </h1>
        <div className="flex gap-2">
          <button className="bg-red-600/10 text-red-500 px-3 py-1 rounded-full text-xs font-bold uppercase">Trending</button>
          <button className="bg-white/5 text-gray-400 px-3 py-1 rounded-full text-xs font-bold uppercase">Top Rated</button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {MOCK_NOVELS.map(novel => (
          <div key={novel.id} className="group cursor-pointer">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg border border-white/5 mb-3">
              <img src={novel.cover_url} alt={novel.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              {novel.is_hot && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow-xl uppercase">
                  HOT
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px]">
                <i className="fa-solid fa-star text-yellow-500"></i> {novel.rating}
              </div>
            </div>
            <h3 className="font-bold text-sm truncate">{novel.title}</h3>
            <p className="text-[10px] text-gray-500">{novel.author}</p>
            <p className="text-[10px] text-green-500 mt-1">{novel.chapters} Chapters</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white/5 rounded-2xl p-6 border border-white/10">
        <h2 className="text-lg font-bold mb-4">Reading History</h2>
        <div className="flex flex-col gap-4">
           <div className="flex items-center gap-4 bg-[#252525] p-3 rounded-lg">
             <div className="w-10 h-14 bg-gray-800 rounded"></div>
             <div className="flex-1">
                <div className="text-sm font-bold">Start Reading...</div>
                <p className="text-[10px] text-gray-500">Your history will appear here.</p>
             </div>
             <i className="fa-solid fa-chevron-right text-gray-600"></i>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NovelHub;
