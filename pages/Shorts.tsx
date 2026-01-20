
import React, { useMemo, useEffect, useRef, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
// Use namespace import to resolve missing Link named export
const Link = ReactRouterDOM.Link;
import { getDB, incrementView } from '../store/mockData';
import { ContentType, ContentItem } from '../types';

const ShortVideoPlayer: React.FC<{ item: ContentItem }> = ({ item }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.6 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      videoRef.current?.play().catch(() => {});
      setIsPlaying(true);
      incrementView(item.id);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isVisible, item.id]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="short-item relative bg-black w-full flex items-center justify-center">
      {/* Immersive Video */}
      <video
        ref={videoRef}
        src={item.stream_url}
        className="h-full w-full object-cover md:w-auto md:max-w-md"
        loop
        playsInline
        onClick={togglePlay}
      />
      
      {/* Floating Exit Button (Top Left) */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 z-50 text-white bg-black/40 hover:bg-black/60 w-10 h-10 rounded-full flex items-center justify-center transition-all md:hidden"
      >
        <i className="fa-solid fa-arrow-left text-lg"></i>
      </Link>

      {/* Overlay UI */}
      <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end pb-24 md:pb-12">
        <div className="flex-1 text-white pr-4">
          <h3 className="font-bold text-lg mb-1">@{item.title.replace(/\s+/g, '').toLowerCase()}</h3>
          <p className="text-sm line-clamp-2 text-gray-300">{item.description}</p>
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
            <i className="fa-solid fa-music"></i>
            <span>Original Audio • {item.genre}</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-6 items-center text-white pb-4">
          <div className="flex flex-col items-center gap-1">
            <button className="text-3xl hover:text-red-500 transition active:scale-125"><i className="fa-solid fa-heart"></i></button>
            <span className="text-xs">{item.views.toLocaleString()}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <button className="text-3xl hover:text-blue-400 transition active:scale-125"><i className="fa-solid fa-comment"></i></button>
            <span className="text-xs">{(item.views / 20).toFixed(0)}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <button className="text-3xl hover:text-green-400 transition active:scale-125"><i className="fa-solid fa-share"></i></button>
            <span className="text-xs">Share</span>
          </div>
        </div>
      </div>
      
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <i className="fa-solid fa-play text-white/50 text-6xl"></i>
        </div>
      )}
    </div>
  );
};

const Shorts: React.FC = () => {
  // Fix: Updated sort logic to use created_at (string) and conversion to timestamp for subtraction
  const shorts = useMemo(() => 
    getDB().filter(i => i.type === ContentType.SHORT).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()), 
  []);

  return (
    <div className="shorts-container bg-black scroll-snap-y snap-mandatory h-screen overflow-y-scroll overflow-x-hidden">
      {shorts.length > 0 ? (
        shorts.map(short => <ShortVideoPlayer key={short.id} item={short} />)
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4">
          <i className="fa-solid fa-film text-4xl"></i>
          <p>No shorts available. Upload some in the Admin Panel!</p>
          <Link to="/admin" className="text-red-600 font-bold border border-red-600 px-4 py-2 rounded">Go to Admin</Link>
        </div>
      )}
    </div>
  );
};

export default Shorts;
