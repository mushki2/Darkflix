
import React, { useState, useMemo } from 'react';
import { ContentType, ContentItem, Episode } from '../types';
import { getDB, saveDB } from '../store/mockData';
import { mockSupabase } from '../lib/supabase';

const CreatorDashboard: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [type, setType] = useState<ContentType>(ContentType.MOVIE);
  const [poster, setPoster] = useState('');
  const [streamUrl, setStreamUrl] = useState('');
  const [genre, setGenre] = useState('');
  const [director, setDirector] = useState('');
  const [cast, setCast] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Series Specific State
  const [episodes, setEpisodes] = useState<Partial<Episode>[]>([]);

  const user = mockSupabase.auth.getUser().data.user;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPoster(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addEpisodeField = () => {
    setEpisodes([...episodes, { 
      id: Math.random().toString(), 
      title: '', 
      stream_url: '', 
      episode_number: episodes.length + 1, 
      season: 1, 
      duration: '24m' 
    }]);
  };

  const handleAddContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !poster) {
      alert("Please fill mandatory fields (Title, Description, Poster)");
      return;
    }

    const newItem: ContentItem = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      year,
      type,
      poster_url: poster,
      stream_url: type !== ContentType.SERIES ? streamUrl : undefined,
      episodes: type === ContentType.SERIES ? episodes as Episode[] : undefined,
      views: 0,
      created_at: new Date().toISOString(),
      genre,
      director,
      cast: cast.split(',').map(s => s.trim()),
      creator_id: user?.id || 'anonymous'
    };

    const db = getDB();
    saveDB([newItem, ...db]);
    
    // Reset form
    setTitle('');
    setDescription('');
    setPoster('');
    setStreamUrl('');
    setGenre('');
    setEpisodes([]);
    setStatus('success');
    setTimeout(() => setStatus('idle'), 3000);
  };

  if (user?.role !== 'creator') {
    return (
      <div className="h-screen flex items-center justify-center text-center p-4">
        <div className="space-y-4">
          <i className="fa-solid fa-lock text-5xl text-red-600"></i>
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-gray-400">You must be a Creator to access this dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-24 px-4 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-wand-magic-sparkles text-3xl text-red-600"></i>
          <h1 className="text-3xl font-bold tracking-tight">Creator Hub</h1>
        </div>
        <div className="flex gap-2">
          <div className="bg-gray-800 px-4 py-2 rounded-lg text-xs font-mono">
            ID: {user.id}
          </div>
          <div className="bg-red-600/20 text-red-500 px-4 py-2 rounded-lg text-xs font-bold uppercase">
            Active
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#181818] p-6 md:p-8 rounded-xl border border-gray-800 shadow-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <i className="fa-solid fa-film"></i> Upload Content
            </h2>

            <form onSubmit={handleAddContent} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 col-span-1 md:col-span-2">
                  <label className="text-sm font-medium text-gray-400">Content Title *</label>
                  <input 
                    type="text" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Enter movie or show name"
                    className="w-full bg-[#252525] border border-gray-700 rounded-lg p-4 focus:ring-2 focus:ring-red-600 outline-none transition"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Content Type</label>
                  <select 
                    value={type}
                    onChange={e => setType(e.target.value as ContentType)}
                    className="w-full bg-[#252525] border border-gray-700 rounded-lg p-4 outline-none appearance-none"
                  >
                    <option value={ContentType.MOVIE}>Movie</option>
                    <option value={ContentType.SERIES}>TV Series</option>
                    <option value={ContentType.SHORT}>Short (Reel)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Genre</label>
                  <input 
                    type="text" 
                    value={genre}
                    onChange={e => setGenre(e.target.value)}
                    placeholder="Drama, Action..."
                    className="w-full bg-[#252525] border border-gray-700 rounded-lg p-4 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Director</label>
                  <input 
                    type="text" 
                    value={director}
                    onChange={e => setDirector(e.target.value)}
                    placeholder="Director Name"
                    className="w-full bg-[#252525] border border-gray-700 rounded-lg p-4 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Cast (comma separated)</label>
                  <input 
                    type="text" 
                    value={cast}
                    onChange={e => setCast(e.target.value)}
                    placeholder="Actor 1, Actor 2..."
                    className="w-full bg-[#252525] border border-gray-700 rounded-lg p-4 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Description *</label>
                <textarea 
                  rows={4}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Tell your audience about this project..."
                  className="w-full bg-[#252525] border border-gray-700 rounded-lg p-4 outline-none resize-none"
                  required
                />
              </div>

              {type !== ContentType.SERIES ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Stream URL (Direct .mp4 link) *</label>
                  <input 
                    type="text" 
                    value={streamUrl}
                    onChange={e => setStreamUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-[#252525] border border-gray-700 rounded-lg p-4 outline-none"
                  />
                </div>
              ) : (
                <div className="space-y-4 border-t border-gray-800 pt-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold">Episodes Management</h3>
                    <button 
                      type="button"
                      onClick={addEpisodeField}
                      className="text-xs bg-red-600/10 text-red-500 border border-red-600/20 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition"
                    >
                      + Add Episode
                    </button>
                  </div>
                  {episodes.map((ep, idx) => (
                    <div key={idx} className="bg-[#252525] p-4 rounded-lg space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                         <input 
                           placeholder="Ep Title" 
                           className="bg-gray-800 p-2 rounded text-sm"
                           value={ep.title}
                           onChange={e => {
                             const n = [...episodes];
                             n[idx].title = e.target.value;
                             setEpisodes(n);
                           }}
                         />
                         <input 
                           placeholder="Video URL" 
                           className="bg-gray-800 p-2 rounded text-sm"
                           value={ep.stream_url}
                           onChange={e => {
                             const n = [...episodes];
                             n[idx].stream_url = e.target.value;
                             setEpisodes(n);
                           }}
                         />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Poster Artwork *</label>
                <div className="flex flex-col md:flex-row gap-6 items-center bg-[#252525] p-4 rounded-lg border border-dashed border-gray-700">
                  <div className="flex-1 w-full">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="poster-upload"
                    />
                    <label 
                      htmlFor="poster-upload"
                      className="cursor-pointer block text-center py-6 border-2 border-dashed border-gray-600 rounded-lg hover:border-red-600 transition"
                    >
                      <i className="fa-solid fa-cloud-arrow-up text-2xl mb-2 text-gray-400"></i>
                      <span className="block text-sm text-gray-500">Click to upload poster (2:3 aspect ratio)</span>
                    </label>
                  </div>
                  {poster && (
                    <img src={poster} alt="Preview" className="w-24 h-36 object-cover rounded-md shadow-2xl ring-1 ring-white/10" />
                  )}
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 rounded-xl transition shadow-xl active:transform active:scale-[0.98] text-lg uppercase tracking-wider"
              >
                {status === 'success' ? 'Publication Successful!' : 'Publish to DarkFlix'}
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#181818] p-6 rounded-xl border border-gray-800 shadow-xl">
            <h3 className="font-bold mb-4 flex items-center gap-2">
               <i className="fa-solid fa-chart-line text-green-500"></i> Lifetime Stats
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-800">
                <span className="text-gray-400 text-sm">Followers</span>
                <span className="font-bold">1,204</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-800">
                <span className="text-gray-400 text-sm">Engagement Rate</span>
                <span className="font-bold text-green-500">12.4%</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-800">
                <span className="text-gray-400 text-sm">Creator Rank</span>
                <span className="font-bold">#402</span>
              </div>
            </div>
          </div>

          <div className="bg-[#181818] p-6 rounded-xl border border-gray-800 shadow-xl overflow-hidden">
             <h3 className="font-bold mb-4">Your Recent Content</h3>
             <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                {getDB().filter(i => i.creator_id === user.id || i.creator_id === 'anonymous').map(item => (
                  <div key={item.id} className="flex gap-4 p-2 bg-[#252525] rounded-lg border border-gray-700 group hover:border-red-600 transition">
                    <img src={item.poster_url || (item as any).poster} className="w-12 h-16 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold truncate">{item.title}</div>
                      <div className="text-[10px] text-gray-500 uppercase">{item.type}</div>
                      <div className="mt-1 text-xs text-green-500">{(item.views).toLocaleString()} views</div>
                    </div>
                    <button className="self-center p-2 opacity-0 group-hover:opacity-100 transition"><i className="fa-solid fa-pen-to-square text-gray-400"></i></button>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
