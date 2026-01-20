
import { ContentItem, ContentType, Novel, DownloadedItem, Region } from '../types';

export interface UpcomingItem {
  id: string;
  title: string;
  date: string;
  month: string;
  booked: number;
  poster_url: string;
}

const SAMPLE_VIDEO_URLS = [
  'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
];

export const UPCOMING_CALENDAR: UpcomingItem[] = [
  { id: 'u1', title: 'Memory of a Killer', date: '26', month: 'Jan', booked: 7445, poster_url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800' },
  { id: 'u2', title: 'Wonder Man', date: '27', month: 'Jan', booked: 20004, poster_url: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800' },
  { id: 'u3', title: 'The Wrecking Cr...', date: '28', month: 'Jan', booked: 17094, poster_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800' },
  { id: 'u4', title: 'Shrinking', date: '28', month: 'Jan', booked: 4623, poster_url: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=800' },
];

export const MOCK_NOVELS: Novel[] = [
  { id: 'n1', title: 'The Silent Patient', author: 'Alex Michaelides', cover_url: 'https://picsum.photos/seed/novel1/300/450', description: 'A woman shoots her husband five times.', chapters: 42, rating: 4.8, is_hot: true },
  { id: 'n2', title: 'Project Hail Mary', author: 'Andy Weir', cover_url: 'https://picsum.photos/seed/novel2/300/450', description: 'A lone astronaut.', chapters: 35, rating: 4.9, is_hot: true },
  { id: 'n3', title: 'The Alchemist', author: 'Paulo Coelho', cover_url: 'https://picsum.photos/seed/novel3/300/450', description: 'A fable about following your dream.', chapters: 20, rating: 4.7, is_hot: false },
  { id: 'n4', title: 'Dune: Messiah', author: 'Frank Herbert', cover_url: 'https://picsum.photos/seed/novel4/300/450', description: 'The continuation of the epic saga.', chapters: 55, rating: 4.6, is_hot: true },
];

const INITIAL_CONTENT: ContentItem[] = [
  // HOLLYWOOD 2025
  {
    id: 'h1',
    title: 'Stranger Things 5',
    description: 'The final battle for Hawkins begins.',
    year: 2025,
    type: ContentType.SERIES,
    region: 'Hollywood',
    poster_url: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800',
    stream_url: SAMPLE_VIDEO_URLS[0],
    views: 1542000,
    created_at: new Date().toISOString(),
    genre: 'Sci-Fi',
    creator_id: 'admin',
    is_live: true
  },
  {
    id: 'h3',
    title: 'Avengers: Secret Wars',
    description: 'The multiverse collapses.',
    year: 2025,
    type: ContentType.MOVIE,
    region: 'Hollywood',
    poster_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800',
    stream_url: SAMPLE_VIDEO_URLS[2],
    views: 8900045,
    created_at: new Date().toISOString(),
    genre: 'Action',
    creator_id: 'admin'
  },
  {
    id: 'h4',
    title: 'Project Helios',
    description: 'A deep space mission goes wrong.',
    year: 2025,
    type: ContentType.MOVIE,
    region: 'Hollywood',
    poster_url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800',
    stream_url: SAMPLE_VIDEO_URLS[1],
    views: 2300450,
    created_at: new Date().toISOString(),
    genre: 'Sci-Fi',
    creator_id: 'admin'
  },
  {
    id: 'h5',
    title: 'Neon Nights',
    description: 'Cyberpunk detective story.',
    year: 2025,
    type: ContentType.MOVIE,
    region: 'Hollywood',
    poster_url: 'https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?q=80&w=800',
    stream_url: SAMPLE_VIDEO_URLS[3],
    views: 1205600,
    created_at: new Date().toISOString(),
    genre: 'Action',
    creator_id: 'admin'
  },
  // NOLLYWOOD 2025
  {
    id: 'n1',
    title: 'The Lagos Heist',
    description: 'A group of criminals plan the ultimate bank robbery in the heart of Lagos.',
    year: 2025,
    type: ContentType.MOVIE,
    region: 'Nollywood',
    poster_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800',
    stream_url: SAMPLE_VIDEO_URLS[3],
    views: 520400,
    created_at: new Date().toISOString(),
    genre: 'Crime',
    creator_id: 'admin',
    is_live: true
  },
  {
    id: 'n3',
    title: 'Eko Atlantic',
    description: 'Power and politics in Nigeria\'s futuristic city.',
    year: 2025,
    type: ContentType.SERIES,
    region: 'Nollywood',
    poster_url: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=800',
    stream_url: SAMPLE_VIDEO_URLS[0],
    views: 450120,
    created_at: new Date().toISOString(),
    genre: 'Drama',
    creator_id: 'admin'
  },
  {
    id: 'n4',
    title: 'Jagun Jagun 2',
    description: 'The war of kings continues.',
    year: 2025,
    type: ContentType.MOVIE,
    region: 'Nollywood',
    poster_url: 'https://images.unsplash.com/photo-1533107862482-0e6974b06ef4?q=80&w=800',
    stream_url: SAMPLE_VIDEO_URLS[4],
    views: 980700,
    created_at: new Date().toISOString(),
    genre: 'Epic',
    creator_id: 'admin'
  },
  // BOLLYWOOD 2025
  {
    id: 'b1',
    title: 'Pathaan 2',
    description: 'The spy returns for a high-octane mission.',
    year: 2025,
    type: ContentType.MOVIE,
    region: 'Bollywood',
    poster_url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800',
    stream_url: SAMPLE_VIDEO_URLS[0],
    views: 940020,
    created_at: new Date().toISOString(),
    genre: 'Action',
    creator_id: 'admin'
  },
  {
    id: 'b2',
    title: 'Devdas: Reimagined',
    description: 'A modern take on the classic tale of love and loss.',
    year: 2025,
    type: ContentType.MOVIE,
    region: 'Bollywood',
    poster_url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800',
    stream_url: SAMPLE_VIDEO_URLS[1],
    views: 450300,
    created_at: new Date().toISOString(),
    genre: 'Romance',
    creator_id: 'admin'
  },
  {
    id: 'b3',
    title: 'Kalki 2',
    description: 'The divine intervention.',
    year: 2025,
    type: ContentType.MOVIE,
    region: 'Bollywood',
    poster_url: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800',
    stream_url: SAMPLE_VIDEO_URLS[2],
    views: 1200340,
    created_at: new Date().toISOString(),
    genre: 'Mythology',
    creator_id: 'admin'
  },
  // ANIME 2025
  {
    id: 'a1',
    title: 'Solo Leveling Season 2',
    description: 'Jinwoo faces the monarchs.',
    year: 2025,
    type: ContentType.ANIME,
    poster_url: 'https://images.unsplash.com/photo-1605142859862-978be7eba909?q=80&w=800',
    stream_url: SAMPLE_VIDEO_URLS[2],
    views: 2500000,
    created_at: new Date().toISOString(),
    genre: 'Fantasy',
    creator_id: 'admin'
  },
  {
    id: 'a3',
    title: 'Kaiju No. 8',
    description: 'Kafka struggles with his monster form.',
    year: 2025,
    type: ContentType.ANIME,
    poster_url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=800',
    stream_url: SAMPLE_VIDEO_URLS[1],
    views: 3200450,
    created_at: new Date().toISOString(),
    genre: 'Action',
    creator_id: 'admin'
  },
  {
    id: 'a4',
    title: 'Oshi no Ko 3',
    description: 'The secrets of the idol world.',
    year: 2025,
    type: ContentType.ANIME,
    poster_url: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=800',
    stream_url: SAMPLE_VIDEO_URLS[4],
    views: 1500900,
    created_at: new Date().toISOString(),
    genre: 'Drama',
    creator_id: 'admin'
  },
  // SHORTS
  {
    id: 's1',
    title: 'Ninja Kamui: Duel',
    description: 'Intense short battle.',
    year: 2025,
    type: ContentType.SHORT,
    poster_url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=800',
    stream_url: SAMPLE_VIDEO_URLS[4],
    views: 12050,
    created_at: new Date().toISOString(),
    genre: 'Action',
    creator_id: 'admin'
  },
  {
    id: 's2',
    title: 'Lagos Night Life',
    description: 'Snapshots of the city.',
    year: 2025,
    type: ContentType.SHORT,
    poster_url: 'https://images.unsplash.com/photo-1524850041227-63d201a4d31c?q=80&w=800',
    stream_url: SAMPLE_VIDEO_URLS[0],
    views: 24000,
    created_at: new Date().toISOString(),
    genre: 'Vlog',
    creator_id: 'admin'
  },
  // SERIES
  {
    id: 'h2',
    title: 'The Knight of Seven Kingdoms',
    description: 'A century before Game of Thrones.',
    year: 2024,
    type: ContentType.SERIES,
    region: 'Hollywood',
    poster_url: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=800',
    stream_url: SAMPLE_VIDEO_URLS[1],
    views: 1200000,
    created_at: new Date().toISOString(),
    genre: 'Fantasy',
    creator_id: 'admin'
  }
];

export const getDB = (): ContentItem[] => {
  const stored = localStorage.getItem('darkflix_db');
  if (stored) return JSON.parse(stored);
  localStorage.setItem('darkflix_db', JSON.stringify(INITIAL_CONTENT));
  return INITIAL_CONTENT;
};

export const saveDB = (data: ContentItem[]) => {
  localStorage.setItem('darkflix_db', JSON.stringify(data));
};

export const incrementView = (id: string) => {
  const db = getDB();
  const index = db.findIndex(item => item.id === id);
  if (index !== -1) {
    db[index].views += 1;
    saveDB(db);
  }
};

export const getDownloads = (): DownloadedItem[] => {
  const stored = localStorage.getItem('darkflix_downloads');
  return stored ? JSON.parse(stored) : [];
};

export const addDownload = (item: ContentItem) => {
  const downloads = getDownloads();
  if (!downloads.find(d => d.id === item.id)) {
    const newItem: DownloadedItem = {
      id: item.id,
      title: item.title,
      poster_url: item.poster_url,
      size: `${(Math.random() * 500 + 100).toFixed(1)}MB`,
      progress: 0,
      status: 'downloading'
    };
    localStorage.setItem('darkflix_downloads', JSON.stringify([...downloads, newItem]));
  }
};
