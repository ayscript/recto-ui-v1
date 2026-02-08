import { supabase } from "./supabaseClient";

const API_URL = "https://recto-backend.onrender.com";

const getHeaders = () => {
  const auth_token = localStorage.getItem("AUTH_TOKEN_KEY");

  return {
    "Content-Type": "application/json",
    ...(auth_token ? { Authorization: `Bearer ${auth_token}` } : {}),
  };
};

export const api = {
  async post(endpoint: string, data: any): Promise<any> {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      throw new Error("No active session");
    }

    try {
      const res = await fetch(`${API_URL}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(data),
      });

      const payload = await res.json();
      console.log("API Response:", payload);

      if (!res.ok) {
        throw new Error("API request failed");
      }

      // return { status: 'success' };
      return payload;
    } catch (error) {
      return error;
    }
  },

  // Added Promise<any> to prevent restrictive union type inference in mock service
  async get(endpoint: string, params?: Record<string, string>): Promise<any> {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      throw new Error("No active session");
    }

    const url =
      `${API_URL}/${endpoint}` +
      (params ? "?" + new URLSearchParams(params).toString() : "");

    if (endpoint === "get_all_images") {
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
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    const payload = await res.json();

    if (!res.ok) {
      throw new Error(payload?.detail || "API request failed");
    }

    return payload;
  },
};
