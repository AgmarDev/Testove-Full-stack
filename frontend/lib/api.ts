const BASE_URL = "http://localhost:5000";

export const api = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error("API Request failed");
  }

  return response.json();
};

export const deleteTodo = (id: string) =>
  api(`/todos/${id}`, { method: "DELETE" });

export const updateTodo = (id: string, data: any) =>
  api(`/todos/${id}`, { method: "PUT", body: JSON.stringify(data) });
