
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';
import DesignCanvas from '../components/DesignCanvas';

const WorkspacePage: React.FC = () => {
  const { id } = useParams();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [designCode, setDesignCode] = useState<string | null>(null);
  const [customTexts, setCustomTexts] = useState<Record<string, string>>({
    title: "MODERN EVENT",
    subtitle: "AI GENERATED DESIGN",
    date: "OCTOBER 24, 2024"
  });
  const [customColors, setCustomColors] = useState<Record<string, string>>({
    bg: "#1e293b",
    text: "#ffffff",
    accent: "#f59e0b"
  });
  const [fontSize, setFontSize] = useState(48);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      const response = await api.get('/send_chat', { 
        session_id: id || 'new', 
        message: prompt 
      });
      setDesignCode(response.canvas_code);
    } catch (error) {
      console.error('Generation failed', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = (format: 'png' | 'jpeg' | 'webp') => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    
    const url = canvas.toDataURL(`image/${format}`);
    const link = document.createElement('a');
    link.download = `recto-design-${Date.now()}.${format === 'jpeg' ? 'jpg' : format}`;
    link.href = url;
    link.click();
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-8">
      {/* Sidebar Controls */}
      <div className="w-full lg:w-80 flex flex-col space-y-6">
        {/* Prompt Input */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4">AI Design Assistant</h3>
          <form onSubmit={handleGenerate} className="space-y-4">
            <textarea
              className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none text-sm"
              rows={4}
              placeholder="Describe your design... e.g., 'A vibrant summer music festival poster with tropical leaves'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              type="submit"
              disabled={isGenerating || !prompt}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 transition-all flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Designing...
                </>
              ) : 'Generate Design'}
            </button>
          </form>
        </div>

        {/* Editing Controls - Only visible if design exists */}
        {designCode && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex-1 overflow-y-auto max-h-[500px]">
            <h3 className="font-bold text-slate-800 mb-4">Edit Content</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Main Title</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  value={customTexts.title}
                  onChange={(e) => setCustomTexts({ ...customTexts, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Subtitle</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  value={customTexts.subtitle}
                  onChange={(e) => setCustomTexts({ ...customTexts, subtitle: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Date / Info</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  value={customTexts.date}
                  onChange={(e) => setCustomTexts({ ...customTexts, date: e.target.value })}
                />
              </div>
              
              <div className="pt-4 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Font Size ({fontSize}px)</label>
                <input 
                  type="range" min="20" max="120"
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Background</label>
                  <input 
                    type="color" 
                    className="w-full h-10 p-1 bg-white border border-slate-200 rounded-lg cursor-pointer"
                    value={customColors.bg}
                    onChange={(e) => setCustomColors({ ...customColors, bg: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Text Color</label>
                  <input 
                    type="color" 
                    className="w-full h-10 p-1 bg-white border border-slate-200 rounded-lg cursor-pointer"
                    value={customColors.text}
                    onChange={(e) => setCustomColors({ ...customColors, text: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Design Area */}
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-200 rounded-3xl min-h-[600px] p-8 border-4 border-dashed border-slate-300 relative">
        {designCode ? (
          <>
            <div className="mb-6 flex space-x-2">
              <button 
                onClick={() => downloadImage('png')}
                className="px-4 py-2 bg-white text-slate-700 text-sm font-bold rounded-lg shadow hover:bg-slate-50 transition-colors"
              >
                PNG
              </button>
              <button 
                onClick={() => downloadImage('jpeg')}
                className="px-4 py-2 bg-white text-slate-700 text-sm font-bold rounded-lg shadow hover:bg-slate-50 transition-colors"
              >
                JPG
              </button>
              <button 
                onClick={() => downloadImage('webp')}
                className="px-4 py-2 bg-white text-slate-700 text-sm font-bold rounded-lg shadow hover:bg-slate-50 transition-colors"
              >
                WEBP
              </button>
            </div>
            
            <DesignCanvas 
              code={designCode} 
              customizations={{ texts: customTexts, colors: customColors, fontSize }} 
            />
            
            <div className="mt-8 text-center text-slate-500 text-sm">
              <p>W: 600px | H: 800px | AI Assisted Render</p>
            </div>
          </>
        ) : (
          <div className="text-center p-12 max-w-sm">
            <div className="w-20 h-20 bg-slate-300 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-slate-500 mb-2">Ready to Design?</h4>
            <p className="text-slate-400 text-sm">Enter a prompt in the left sidebar to start generating your custom flyer with AI.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkspacePage;
