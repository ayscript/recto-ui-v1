
import { AUTH_TOKEN_KEY, API_BASE_URL } from '../constants';

const getHeaders = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const api = {
  // Added Promise<any> to prevent restrictive union type inference in mock service
  async post(endpoint: string, data: any): Promise<any> {
    // In a real scenario, this would call the backend. 
    // For this implementation, we simulate the FastAPI interaction.
    console.log(`API POST to ${endpoint}`, data);
    
    // Simulating specific endpoint behavior for demo/prototype
    if (endpoint === '/login') {
      return { access_token: 'mock-jwt-token', token_type: 'bearer' };
    }
    
    return { status: 'success' };
  },

  // Added Promise<any> to prevent restrictive union type inference in mock service
  async get(endpoint: string, params?: Record<string, string>): Promise<any> {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    if (params) {
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    }
    
    console.log(`API GET to ${endpoint}`, params);

    // Mock response for /send_chat
    if (endpoint === '/send_chat') {
      return {
        canvas_code: `
          const draw = (ctx, width, height, custom = {}) => {
            const { texts = {}, colors = {}, fontSize = 48 } = custom;
            
            // Background
            ctx.fillStyle = colors.bg || '#1e293b';
            ctx.fillRect(0, 0, width, height);
            
            // Decorative elements
            ctx.strokeStyle = colors.accent || '#f59e0b';
            ctx.lineWidth = 10;
            ctx.strokeRect(40, 40, width - 80, height - 80);
            
            // Main Text
            ctx.fillStyle = colors.text || '#ffffff';
            ctx.font = \`bold \${fontSize}px Inter\`;
            ctx.textAlign = 'center';
            ctx.fillText(texts.title || "MODERN EVENT", width / 2, height / 2 - 20);
            
            ctx.font = '300 24px Inter';
            ctx.fillText(texts.subtitle || "AI GENERATED DESIGN", width / 2, height / 2 + 30);
            
            // Details
            ctx.fillStyle = colors.accent || '#f59e0b';
            ctx.font = '500 18px Inter';
            ctx.fillText(texts.date || "OCTOBER 24, 2024", width / 2, height - 100);
          };
          return draw;
        `
      };
    }

    if (endpoint === '/get_profile') {
      return { id: '1', email: 'user@example.com', full_name: 'Alex Design' };
    }

    if (endpoint === '/get_all_images') {
      return [
        { id: '1', prompt: 'Music Festival Flyer', timestamp: new Date().toISOString() },
        { id: '2', prompt: 'Business Conference', timestamp: new Date().toISOString() },
        { id: '3', prompt: 'Art Exhibition', timestamp: new Date().toISOString() },
      ];
    }

    return {};
  }
};
