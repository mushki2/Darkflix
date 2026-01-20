
import React, { useState } from 'react';
import { ContentType, ContentItem } from '../types';
import { getDB, saveDB } from '../store/mockData';

const Admin: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [type, setType] = useState<ContentType>(ContentType.MOVIE);
  const [poster, setPoster] = useState('');
  const [streamUrl, setStreamUrl] = useState('');
  const [genre, setGenre] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPoster(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !poster || !streamUrl) {
      alert("Please fill all fields");
      return;
    }

    // Fix: Updated property names and values to match ContentItem interface
    const newItem: ContentItem = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      year,
      type,
      poster_url: poster,
      stream_url: streamUrl,
      views: 0,
      created_at: new Date().toISOString(),
      genre,
      creator_id: 'admin',
      episodes: type === ContentType.SERIES ? [] : undefined
    };

    const db = getDB();
    saveDB([newItem, ...db]);
    
    // Reset form
    setTitle('');
    setDescription('');
    setPoster('');
    setStreamUrl('');
    setGenre('');
    setStatus('success');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="min-h-screen pt-24 pb-24 px-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <i className="fa-solid fa-user-shield text-3xl text-red-600"></i>
        <h1 className="text-3xl font-bold">Admin Panel</h1>
      </div>

      <div className="bg-[#181818] p-6 md:p-8 rounded-xl shadow-lg border border-gray-800">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <i className="fa-solid fa-plus-circle"></i> Add New Content
        </h2>

        <form onSubmit={handleAddContent} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={e => setTitle(e.target.value)}
                placeholder="Content Title"
                className="w-full bg-[#252525] border border-gray-700 rounded-md p-3 focus:border-red-600 outline-none transition"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Content Type</label>
              <select 
                value={type}
                onChange={e => setType(e.target.value as ContentType)}
                className="w-full bg-[#252525] border border-gray-700 rounded-md p-3 focus:border-red-600 outline-none transition"
              >
                <option value={ContentType.MOVIE}>Movie</option>
                <option value={ContentType.SERIES}>TV Series</option>
                <option value={ContentType.SHORT}>Short (Reel)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Year</label>
              <input 
                type="number" 
                value={year}
                onChange={e => setYear(parseInt(e.target.value))}
                className="w-full bg-[#252525] border border-gray-700 rounded-md p-3 focus:border-red-600 outline-none transition"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Genre</label>
              <input 
                type="text" 
                value={genre}
                onChange={e => setGenre(e.target.value)}
                placeholder="e.g. Action, Sci-Fi"
                className="w-full bg-[#252525] border border-gray-700 rounded-md p-3 focus:border-red-600 outline-none transition"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Description</label>
            <textarea 
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="What is this about?"
              className="w-full bg-[#252525] border border-gray-700 rounded-md p-3 focus:border-red-600 outline-none transition"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Stream URL (Direct Link)</label>
            <input 
              type="text" 
              value={streamUrl}
              onChange={e => setStreamUrl(e.target.value)}
              placeholder="https://example.com/video.mp4"
              className="w-full bg-[#252525] border border-gray-700 rounded-md p-3 focus:border-red-600 outline-none transition"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Poster Image</label>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700"
              />
              {poster && (
                <img src={poster} alt="Preview" className="w-20 h-28 object-cover rounded shadow-md border border-gray-700" />
              )}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-md transition shadow-lg active:transform active:scale-95"
          >
            {status === 'success' ? 'Added Successfully!' : 'Upload Content'}
          </button>
        </form>
      </div>

      {/* Database Stats */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="bg-[#181818] p-4 rounded-lg border border-gray-800 text-center">
          <div className="text-2xl font-bold text-red-600">{getDB().length}</div>
          <div className="text-[10px] text-gray-400 uppercase tracking-widest">Total Items</div>
        </div>
        <div className="bg-[#181818] p-4 rounded-lg border border-gray-800 text-center">
          <div className="text-2xl font-bold text-green-500">
            {getDB().reduce((acc, i) => acc + i.views, 0).toLocaleString()}
          </div>
          <div className="text-[10px] text-gray-400 uppercase tracking-widest">Total Views</div>
        </div>
        <div className="bg-[#181818] p-4 rounded-lg border border-gray-800 text-center">
          <div className="text-2xl font-bold text-blue-500">
            {getDB().filter(i => i.type === ContentType.SHORT).length}
          </div>
          <div className="text-[10px] text-gray-400 uppercase tracking-widest">Shorts</div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
