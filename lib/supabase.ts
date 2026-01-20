
// Note: You would typically use actual environment variables here.
// For this environment, we simulate the database layer while providing the structure.

import { ContentItem, Profile, UserRole } from '../types';

// Mocking Supabase Client functionality for the frontend flow
// In a real app, you would use: import { createClient } from '@supabase/supabase-js'

export const mockSupabase = {
  auth: {
    getUser: () => ({ data: { user: JSON.parse(localStorage.getItem('df_user') || 'null') } }),
    signIn: (email: string) => {
      const user = { id: 'u1', email, role: 'user' as UserRole };
      localStorage.setItem('df_user', JSON.stringify(user));
      return { data: { user } };
    },
    signOut: () => localStorage.removeItem('df_user'),
  },
  profiles: {
    get: async (id: string): Promise<Profile | null> => {
      const user = JSON.parse(localStorage.getItem('df_user') || 'null');
      return user ? { ...user, full_name: 'DarkFlix Member' } : null;
    },
    updateRole: async (id: string, role: UserRole) => {
      const user = JSON.parse(localStorage.getItem('df_user') || 'null');
      if (user) {
        user.role = role;
        localStorage.setItem('df_user', JSON.stringify(user));
      }
    }
  }
};
