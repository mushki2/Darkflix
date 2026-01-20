
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
// Using namespace import for useNavigate to resolve export errors
const useNavigate = ReactRouterDOM.useNavigate;
import { mockSupabase } from '../lib/supabase';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isUpgrading, setIsUpgrading] = useState(false);

  useEffect(() => {
    const u = mockSupabase.auth.getUser().data.user;
    if (!u) {
      mockSupabase.auth.signIn('user@example.com');
      setUser(mockSupabase.auth.getUser().data.user);
    } else {
      setUser(u);
    }
  }, []);

  const handleBecomeCreator = async () => {
    setIsUpgrading(true);
    // Simulate API delay
    await new Promise(r => setTimeout(r, 1500));
    await mockSupabase.profiles.updateRole(user.id, 'creator');
    setUser({ ...user, role: 'creator' });
    setIsUpgrading(false);
    alert("Congratulations! You are now a Creator on DarkFlix.");
    navigate('/creator');
  };

  const handleLogout = () => {
    mockSupabase.auth.signOut();
    window.location.reload();
  };

  if (!user) return null;

  return (
    <div className="min-h-screen pt-24 px-4 max-w-2xl mx-auto pb-24">
      <div className="bg-[#181818] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
        <div className="h-32 bg-gradient-to-r from-red-600 to-red-900"></div>
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-6">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} 
              className="w-32 h-32 rounded-full border-4 border-[#181818] bg-gray-900 shadow-xl"
              alt="Avatar"
            />
            <div className="absolute bottom-2 left-24 bg-green-500 w-6 h-6 rounded-full border-4 border-[#181818]"></div>
          </div>

          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold">{user.email.split('@')[0]}</h1>
              <p className="text-gray-400">{user.email}</p>
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800 text-xs font-bold uppercase tracking-widest text-gray-300">
                {user.role === 'creator' ? (
                  <><i className="fa-solid fa-crown text-yellow-500"></i> Creator Status</>
                ) : (
                  <><i className="fa-solid fa-user"></i> Standard Member</>
                )}
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 border border-gray-700 rounded-md hover:bg-gray-800 transition text-sm"
            >
              Sign Out
            </button>
          </div>

          {user.role !== 'creator' ? (
            <div className="bg-red-600/10 border border-red-600/30 rounded-xl p-6 text-center space-y-4">
              <i className="fa-solid fa-wand-magic-sparkles text-4xl text-red-500"></i>
              <h2 className="text-xl font-bold">Ready to share your vision?</h2>
              <p className="text-sm text-gray-400">
                Apply for Creator status to upload your own movies, series, and vertical shorts to the DarkFlix community.
              </p>
              <button 
                onClick={handleBecomeCreator}
                disabled={isUpgrading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition shadow-lg flex items-center justify-center gap-2"
              >
                {isUpgrading ? (
                  <><i className="fa-solid fa-circle-notch animate-spin"></i> Processing...</>
                ) : (
                  'Become a Creator'
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
               <h3 className="font-bold text-lg">Quick Actions</h3>
               <button 
                 onClick={() => navigate('/creator')}
                 className="w-full bg-white text-black font-bold py-3 rounded-lg transition hover:bg-gray-200 flex items-center justify-center gap-2"
               >
                 <i className="fa-solid fa-gauge"></i> Go to Creator Dashboard
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
