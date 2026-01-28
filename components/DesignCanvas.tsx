
import React, { useEffect, useRef, useMemo } from 'react';

interface DesignCanvasProps {
  code: string;
  width?: number;
  height?: number;
  customizations?: {
    texts: Record<string, string>;
    colors: Record<string, string>;
    fontSize: number;
  };
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}

const DesignCanvas: React.FC<DesignCanvasProps> = ({ 
  code, 
  width = 600, 
  height = 800, 
  customizations,
  onCanvasReady 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Safely evaluate the code to get the drawing function
  const drawFunction = useMemo(() => {
    try {
      // The backend returns code like: "return (ctx, w, h) => { ... }"
      // Wrap it in an IIFE context for safer execution
      const fn = new Function(code)();
      if (typeof fn === 'function') return fn;
      return null;
    } catch (e) {
      console.error('Failed to parse design code:', e);
      return null;
    }
  }, [code]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !drawFunction) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and Redraw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Scale for high DPI
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    
    // Call the AI-generated drawing function
    try {
      drawFunction(ctx, width, height, customizations);
      if (onCanvasReady) onCanvasReady(canvas);
    } catch (e) {
      console.error('Drawing error:', e);
    }
  }, [drawFunction, width, height, customizations, onCanvasReady]);

  return (
    <div className="relative mx-auto bg-white rounded-lg shadow-2xl overflow-hidden border border-slate-200">
      <canvas 
        ref={canvasRef} 
        style={{ width: `${width}px`, height: `${height}px` }}
        className="block"
      />
    </div>
  );
};

export default DesignCanvas;
