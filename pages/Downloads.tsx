
import React, { useEffect, useState } from 'react';
import { getDownloads, saveDB } from '../store/mockData';
import { DownloadedItem } from '../types';

const Downloads: React.FC = () => {
  const [downloads, setDownloads] = useState<DownloadedItem[]>([]);

  useEffect(() => {
    setDownloads(getDownloads());
    // Simulate download progress for demonstration
    const interval = setInterval(() => {
      setDownloads(current => 
        current.map(d => {
          if (d.status === 'downloading' && d.progress < 100) {
            const nextProgress = d.progress + Math.floor(Math.random() * 10);
            return {
              ...d,
              progress: nextProgress >= 100 ? 100 : nextProgress,
              status: nextProgress >= 100 ? 'completed' : 'downloading'
            };
          }
          return d;
        })
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleRemove = (id: string) => {
    const next = downloads.filter(d => d.id !== id);
    localStorage.setItem('darkflix_downloads', JSON.stringify(next));
    setDownloads(next);
  };

  return (
    <div className="min-h-screen bg-[#121212] pt-20 pb-24 px-4 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <i className="fa-solid fa-download text-green-500"></i> Downloads
        </h1>
        <span className="text-xs text-gray-500">{downloads.length} Items</span>
      </div>

      {downloads.length > 0 ? (
        <div className="space-y-4">
          {downloads.map(item => (
            <div key={item.id} className="bg-[#181818] rounded-xl p-4 flex gap-4 border border-white/5 shadow-xl relative overflow-hidden group">
              <img src={item.poster_url} className="w-16 h-24 object-cover rounded-lg shadow-md" />
              <div className="flex-1 flex flex-col justify-center gap-2">
                <div className="flex justify-between items-start">
                   <h3 className="font-bold text-sm">{item.title}</h3>
                   <button onClick={() => handleRemove(item.id)} className="text-gray-500 hover:text-red-500 p-1"><i className="fa-solid fa-trash-can"></i></button>
                </div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest">{item.size}</div>
                
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-2">
                   <div 
                    className={`h-full transition-all duration-500 ${item.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${item.progress}%` }}
                   ></div>
                </div>
                <div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase">
                  <span>{item.status}</span>
                  <span>{item.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-600 gap-4">
          <i className="fa-solid fa-cloud-arrow-down text-6xl opacity-20"></i>
          <p className="text-sm">No items downloaded yet.</p>
        </div>
      )}
    </div>
  );
};

export default Downloads;
