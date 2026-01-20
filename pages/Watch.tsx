
import React, { useMemo, useState, useEffect, useRef } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
// Using namespace import to resolve missing hooks exports
const { useParams, useNavigate } = ReactRouterDOM;
import { getDB, incrementView } from '../store/mockData';
import { ContentType, Episode } from '../types';

const Watch: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const db = useMemo(() => getDB(), []);
  const item = useMemo(() => db.find(i => i.id === id), [db, id]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState<string | null>(null);

  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(
    item?.type === ContentType.SERIES && item.episodes ? item.episodes[0] : null
  );

  useEffect(() => {
    if (item) {
      incrementView(item.id);
      // Load saved time
      const saved = localStorage.getItem(`progress_${item.id}`);
      if (saved && videoRef.current) {
        videoRef.current.currentTime = parseFloat(saved);
      }
    }
    // Set first episode if series
    if (item?.type === ContentType.SERIES && item.episodes && !currentEpisode) {
      setCurrentEpisode(item.episodes[0]);
    }
  }, [item, currentEpisode]);

  const handleTimeUpdate = () => {
    if (item && videoRef.current) {
      localStorage.setItem(`progress_${item.id}`, videoRef.current.currentTime.toString());
    }
  };

  const handleVideoError = () => {
    setVideoError("The video could not be loaded. Please check your connection or try again later.");
  };

  if (!item) return <div className="h-screen flex items-center justify-center">Content not found.</div>;

  const streamUrl = item.type === ContentType.SERIES ? currentEpisode?.stream_url : item.stream_url;

  return (
    <div className="min-h-screen bg-[#141414] pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header/Back */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white transition group">
            <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
            <span className="font-bold uppercase text-xs tracking-widest">Back to Browse</span>
          </button>
          <div className="flex gap-4">
             <button className="text-gray-400 hover:text-white transition"><i className="fa-solid fa-gear"></i></button>
             <button className="text-gray-400 hover:text-white transition"><i className="fa-solid fa-expand"></i></button>
          </div>
        </div>

        {/* Video Player Section */}
        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 group">
          {videoError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-center p-8">
              <i className="fa-solid fa-circle-exclamation text-5xl text-red-600 mb-4"></i>
              <h2 className="text-xl font-bold mb-2">Playback Error</h2>
              <p className="text-gray-400 text-sm max-w-md">{videoError}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-6 bg-red-600 px-6 py-2 rounded-full font-bold hover:bg-red-700 transition"
              >
                Retry
              </button>
            </div>
          ) : (
            <video
              key={streamUrl} // Force re-render on source change
              ref={videoRef}
              src={streamUrl}
              controls
              autoPlay
              onTimeUpdate={handleTimeUpdate}
              onError={handleVideoError}
              className="w-full h-full"
              playsInline
            />
          )}
        </div>

        {/* Content Details */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">{item.title}</h1>
                <div className="bg-red-600 text-[10px] font-black px-2 py-0.5 rounded-sm uppercase">{item.type}</div>
              </div>
              <div className="flex items-center gap-4 text-sm font-bold">
                <span className="text-green-500">{item.year}</span>
                <span className="text-gray-500">|</span>
                <span className="text-gray-300">{item.genre}</span>
                <span className="text-gray-500">|</span>
                <span className="text-gray-300">{(item.views).toLocaleString()} Views</span>
              </div>
            </div>
            
            {item.type === ContentType.SERIES && currentEpisode && (
              <div className="bg-red-600/10 border border-red-600/20 p-4 rounded-xl">
                <div className="text-red-500 font-black uppercase text-xs tracking-widest mb-1">
                  Now Playing: S{currentEpisode.season} • E{currentEpisode.episode_number}
                </div>
                <div className="text-lg font-bold text-white">{currentEpisode.title}</div>
              </div>
            )}

            <p className="text-gray-400 leading-relaxed text-lg italic">
              "{item.description}"
            </p>

            <div className="flex gap-8 py-4 border-t border-white/5">
              <button className="flex items-center gap-2 hover:text-green-500 transition font-black text-xs uppercase">
                <i className="fa-solid fa-plus"></i> My List
              </button>
              <button className="flex items-center gap-2 hover:text-red-500 transition font-black text-xs uppercase">
                <i className="fa-solid fa-thumbs-up"></i> Rate
              </button>
              <button className="flex items-center gap-2 hover:text-blue-500 transition font-black text-xs uppercase">
                <i className="fa-solid fa-share-nodes"></i> Share
              </button>
            </div>
          </div>

          {/* Episode Selector for Series */}
          {item.type === ContentType.SERIES && item.episodes && (
            <div className="bg-[#181818] rounded-2xl p-6 h-fit border border-white/5 shadow-2xl">
              <h3 className="font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-2 text-gray-400">
                <i className="fa-solid fa-list-ol text-red-600"></i>
                Episodes
              </h3>
              <div className="space-y-3">
                {item.episodes.map(ep => (
                  <button
                    key={ep.id}
                    onClick={() => {
                      setCurrentEpisode(ep);
                      setVideoError(null);
                    }}
                    className={`w-full text-left p-4 rounded-xl transition-all flex items-center justify-between border ${currentEpisode?.id === ep.id ? 'bg-red-600 border-red-500 text-white shadow-lg' : 'bg-[#252525] border-transparent hover:border-white/20 hover:bg-[#2a2a2a] text-gray-300'}`}
                  >
                    <div className="flex flex-col">
                      <span className={`text-[10px] font-black uppercase mb-1 ${currentEpisode?.id === ep.id ? 'text-white/70' : 'text-red-500'}`}>Episode {ep.episode_number}</span>
                      <span className="text-sm font-bold truncate max-w-[150px]">{ep.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono opacity-60">{ep.duration}</span>
                      {currentEpisode?.id === ep.id ? <i className="fa-solid fa-circle-play text-xs"></i> : <i className="fa-solid fa-play text-[10px] opacity-40"></i>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Watch;
