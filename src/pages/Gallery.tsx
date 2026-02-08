import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { Link } from "react-router-dom";
import { useDashboardStore } from "../../store/dashboardStore";

const GalleryPage: React.FC = () => {
  // const [designs] = useState<any[]>([]);

  const { designs, setDesigns } = useDashboardStore();

  useEffect(() => {
    // api.get("get_all_images").then(setDesigns);
    async function fetchDesigns() {
      try {
        const response = await api.get("sessions");
        setDesigns(response.sessions);
        // console.log(response.sessions);
      } catch (error) {
        console.error("Failed to fetch designs:", error);
      }
    }

    if(designs.length === 0){
      fetchDesigns();
    }
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Your Gallery</h2>
          <p className="text-slate-500">
            All your AI-generated designs in one place
          </p>
        </div>
        <Link
          to="/dashboard/workspace"
          className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-md"
        >
          Create New
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {designs.map((design, index) => (
          <Link
            key={index}
            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all cursor-pointer"
            to={`/dashboard/workspace/${design.session_id}`}
          >
            {/* <div className="aspect-4/5 bg-slate-100 flex items-center justify-center overflow-hidden">
              <img 
                src={`https://picsum.photos/seed/${design.id}/400/500`} 
                alt={design.prompt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div> */}
            <div className="p-4">
              <p className="font-semibold text-slate-800 truncate mb-1">
                {design.preview}
              </p>
              {/* <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Design #{design.id.padStart(3, '0')}</p>
                <p className="text-xs text-slate-400">{new Date(design.timestamp).toLocaleDateString()}</p>
              </div> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
