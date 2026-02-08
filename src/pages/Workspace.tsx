import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import DesignCanvass from "../components/HTMLDesign";
import CanvasDownloader from "../components/DownloadButton";
import ChatMessages from "../components/ChatMessages";
import { Message } from "../components/ChatMessages";
import { useDashboardStore } from "../../store/dashboardStore";

export const cleanResponse = (text: string) => {
  if (!text) return "";
  // Regex matches starting ``` + optional language name + newline, AND ending ```
  return text.replace(/^```(\w+)?\n/g, "").replace(/```$/g, "");
};

const WorkspacePage: React.FC = () => {
  const { id } = useParams();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [designCode, setDesignCode] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const navigate = useNavigate();
  const { designs, setDesigns } = useDashboardStore();

  // Fetch conversation history when component mounts with an id
  useEffect(() => {
    if (id) {
      const fetchHistory = async () => {
        setIsLoadingHistory(true);
        try {
          const response = await api.get(`history/${id}`);
          if (response?.conversation) {
            if (response.conversation.length === 0) {
              navigate('/dashboard/workspace');
              return;
            }
            
            setMessages(response.conversation);
          }
        } catch (error) {
          console.error("Failed to load history:", error);
        } finally {
          setIsLoadingHistory(false);
        }
      };
      fetchHistory();
    } else {
      setMessages([]);
      setDesignCode(null);
    }
  }, [id]);

  useEffect(() => {
    try {
      // console.log(messages[messages.length - 1]);
      setDesignCode(JSON.parse(cleanResponse(messages[messages.length - 1]?.content))?.canvas || null);
    } catch (e) {
      
    }
    // setDesignCode(JSON.parse(cleanResponse(messages[messages.length - 1]?.content))?.canvas || null);
  }, [messages])

  const iframeRef = useRef(null);

  const handleGenerate = async (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: prompt,
      },
    ]);

    setPrompt("");

    setIsGenerating(true);

    const session_id = id || String(Date.now());

    try {
      const responseData = await api.post("chat", {
        session_id,
        message: prompt,
      });

      // console.log("Raw AI Response:", responseData?.response);

      const aiMessage = cleanResponse(responseData?.response);
      console.log("Cleaned AI Message:", aiMessage);
      setDesignCode(JSON.parse(aiMessage).canvas);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: JSON.parse(aiMessage)?.ai_message,
        },
      ]);
      // console.log(aiMessage);
    } catch (error) {
      console.error("Generation failed", error);
    } finally {
      setIsGenerating(false);
      setDesigns([...designs, { session_id, preview: prompt }]);
    }

    if (!id) {
      navigate(`/dashboard/workspace/${session_id}`);
    }
  };

  if(isLoadingHistory){
    return <div className="h-full flex items-center justify-center">
      <svg
        className="animate-spin h-10 w-10 text-indigo-600"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>;
  }

  return (
    <div className="h-full overflow-auto flex flex-col lg:flex-row gap-4">
      {/* Sidebar Controls */}
      <div className="w-full lg:w-80 flex flex-col justify-end space-y-6">
        {/* Editing Controls - Only visible if design exists */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 h-full flex gap-2 flex-col">
          <h3 className="font-bold text-slate-800 mb-2">AI Design Assistant</h3>
          {/* Component to display messages */}
          <ChatMessages messages={messages} />
          {/* Prompt Input */}
          <form onSubmit={handleGenerate} className="space-y-3 mt-auto">
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
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Designing...
                </>
              ) : (
                "Generate Design"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Design Area */}
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-200 rounded-3xl p-4 border-4 border-dashed border-slate-300 relative">
        {designCode ? (
          <>
            <CanvasDownloader iframeRef={iframeRef} />
            <DesignCanvass ref={iframeRef} htmlStringFromApi={designCode} />
          </>
        ) : (
          <div className="text-center p-12 max-w-sm">
            <div className="w-20 h-20 bg-slate-300 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-slate-500 mb-2">
              Ready to Design?
            </h4>
            <p className="text-slate-400 text-sm">
              Enter a prompt to start generating your custom designs with AI.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkspacePage;
