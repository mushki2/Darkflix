
export enum ContentType {
  MOVIE = 'movie',
  SERIES = 'series',
  SHORT = 'short',
  ANIME = 'anime'
}

export type UserRole = 'user' | 'creator';
export type Region = 'Hollywood' | 'Nollywood' | 'Bollywood' | 'Global';

export interface Episode {
  id: string;
  content_id: string;
  title: string;
  stream_url: string;
  duration: string;
  season: number;
  episode_number: number;
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  year: number;
  type: ContentType;
  poster_url: string;
  stream_url?: string;
  episodes?: Episode[];
  views: number;
  created_at: string;
  genre: string;
  region?: Region;
  creator_id: string;
  cast?: string[];
  director?: string;
  is_live?: boolean;
}

export interface Novel {
  id: string;
  title: string;
  author: string;
  cover_url: string;
  description: string;
  chapters: number;
  rating: number;
  is_hot?: boolean;
}

export interface DownloadedItem {
  id: string;
  title: string;
  poster_url: string;
  size: string;
  progress: number;
  status: 'downloading' | 'completed';
}

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  avatar_url?: string;
  full_name?: string;
}
