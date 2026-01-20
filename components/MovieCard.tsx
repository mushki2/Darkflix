
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
// Using namespace import to avoid missing export errors
const Link = ReactRouterDOM.Link;
import { ContentItem } from '../types';

interface MovieCardProps {
  item: ContentItem;
  variant?: 'mobile' | 'desktop';
}

const MovieCard: React.FC<MovieCardProps> = ({ item, variant = 'mobile' }) => {
  if (variant === 'desktop') {
    return (
      <Link to={`/watch/${item.id}`} className="group relative block w-[160px] flex-shrink-0 transition-transform">
        <div className="relative aspect-[2/3] w-full rounded-md overflow-hidden shadow-lg mb-2">
          <img 
            src={item.poster_url} 
            alt={item.title} 
            className="w-full h-full object-cover brightness-[0.9] group-hover:brightness-100 transition duration-300"
            loading="lazy"
          />
          {item.genre === 'Anime' && (
            <div className="absolute top-1 right-1 bg-white/20 backdrop-blur-md text-white text-[9px] px-1 rounded uppercase font-bold">
              English
            </div>
          )}
        </div>
        <h3 className="text-white text-xs font-medium truncate group-hover:text-green-500 transition-colors">
          {item.title}
        </h3>
      </Link>
    );
  }

  // Mobile/Original variant
  return (
    <Link to={`/watch/${item.id}`} className="relative group block rounded-lg overflow-hidden bg-[#181818] transition-all duration-300 transform hover:scale-105 aspect-[2/3] w-[120px] md:w-[180px] flex-shrink-0 shadow-lg border border-white/5">
      <img 
        src={item.poster_url} 
        alt={item.title} 
        className="w-full h-full object-cover brightness-[0.9] group-hover:brightness-100 transition"
        loading="lazy"
      />
      <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black via-black/60 to-transparent">
        <h3 className="text-white text-[11px] md:text-xs font-medium truncate drop-shadow-md">
          {item.title}
        </h3>
      </div>
    </Link>
  );
};

export default MovieCard;
