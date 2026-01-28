
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const DashboardPage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [recentDesigns, setRecentDesigns] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const [user, designs] = await Promise.all([
        api.get('/get_profile'),
        api.get('/get_all_images')
      ]);
      setProfile(user);
      setRecentDesigns(designs);
    };
    loadData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900 display-font">
          Welcome back, {profile?.full_name?.split(' ')[0] || 'Designer'}!
        </h2>
        <p className="text-slate-500 mt-2">What would you like to create today?</p>
      </div>

      {/* Hero Action */}
      <div className="relative overflow-hidden bg-indigo-600 rounded-3xl p-8 mb-12 shadow-xl shadow-indigo-200">
        <div className="relative z-10 max-w-lg">
          <h3 className="text-2xl font-bold text-white mb-4">Launch a new design prompt</h3>
          <p className="text-indigo-100 mb-8">
            Tell our AI what you're thinking. A concert flyer? A business card? A restaurant menu? 
            Just describe it and watch the magic happen.
          </p>
          <button 
            onClick={() => navigate('/workspace')}
            className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-indigo-50 transition-all shadow-lg"
          >
            Create New Design
          </button>
        </div>
        {/* Abstract background shape */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute right-10 top-0 w-40 h-40 bg-indigo-400/20 rounded-full blur-2xl"></div>
      </div>

      {/* Recent Designs Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-xl font-bold text-slate-800">Recent Projects</h4>
          <Link to="/gallery" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
            View all projects &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentDesigns.map((design) => (
            <div 
              key={design.id} 
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all cursor-pointer"
              onClick={() => navigate(`/workspace/${design.id}`)}
            >
              <div className="aspect-[4/5] bg-slate-100 flex items-center justify-center overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/${design.id}/400/500`} 
                  alt={design.prompt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <p className="font-semibold text-slate-800 truncate">{design.prompt}</p>
                <p className="text-xs text-slate-400 mt-1">Edited {new Date(design.timestamp).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
          
          {/* Empty state simulation */}
          {recentDesigns.length === 0 && (
            <div className="col-span-full py-12 text-center bg-white rounded-2xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400">No designs yet. Start your first project!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
