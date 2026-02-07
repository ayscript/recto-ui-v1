import { AUTH_TOKEN_KEY, API_BASE_URL } from "../constants";

const API_URL = "https://recto-backend.onrender.com";
const auth_token = localStorage.getItem("recto_auth_token")

const getHeaders = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return {
    "Content-Type": "application/json",
    ...(auth_token ? { Authorization: `Bearer ${auth_token}` } : {}),
  };
};

export const api = {
  async post(endpoint: string, data: any): Promise<any> {
    try {
      const res = await fetch(`${API_URL}/${endpoint}`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });

      const payload = await res.json();

      if(!res.ok){
        throw(payload?.detail)
      }

      // return { status: 'success' };
      return payload;
    } catch (error) {
      return error
    }
  },

  // Added Promise<any> to prevent restrictive union type inference in mock service
  async get(endpoint: string, params?: Record<string, string>): Promise<any> {
    const url = new URL(`${API_URL}${endpoint}`);
    if (params) {
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key]),
      );
    }

    if (endpoint === "/get_all_images") {
      return [
        {
          id: "1",
          prompt: "Music Festival Flyer",
          timestamp: new Date().toISOString(),
        },
        {
          id: "2",
          prompt: "Business Conference",
          timestamp: new Date().toISOString(),
        },
        {
          id: "3",
          prompt: "Art Exhibition",
          timestamp: new Date().toISOString(),
        },
      ];
    }

    // console.log(getHeaders())

    const res = await fetch(url, {
      headers: getHeaders()
    })

    const data = await res.json()

    return data;
  },
};
