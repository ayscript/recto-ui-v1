
import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { signOut } = useAuth();

  useEffect(() => {
    api.get('get_profile').then(res => {
      setUser(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-bold text-slate-900 mb-8">Account Settings</h2>

      <div className="space-y-8">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8">
            <div className="flex items-center space-x-6 mb-8">
              <div className="relative">
                <img className="w-24 h-24 rounded-3xl" src="https://picsum.photos/seed/recto/96/96" alt="Avatar" />
                <button className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 text-white rounded-xl shadow-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">{user?.full_name}</h3>
                <p className="text-slate-500">{user?.email}</p>
                <span className="inline-flex items-center px-2.5 py-0.5 mt-2 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  Pro Designer
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  defaultValue={user?.full_name}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  defaultValue={user?.email}
                  disabled
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none opacity-50 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100 flex justify-end space-x-4">
              <button className="px-6 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all">Cancel</button>
              <button className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-md">Save Changes</button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-3xl border border-red-100 p-8">
          <h4 className="text-red-800 font-bold mb-2">Danger Zone</h4>
          <p className="text-red-600/70 text-sm mb-6">Once you sign out or delete your account, your active session will be terminated.</p>
          <div className="flex space-x-4">
            <button 
              onClick={signOut}
              className="px-6 py-2 bg-white border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
            >
              Sign out of Recto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
