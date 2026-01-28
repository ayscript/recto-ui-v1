
export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar?: string;
}

export interface DesignState {
  id?: string;
  code: string;
  prompt: string;
  timestamp: string;
  customizations?: {
    texts: Record<string, string>;
    colors: Record<string, string>;
    fontSize: number;
  };
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  canvasCode?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}
