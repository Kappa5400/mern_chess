const BASE_URL = import.meta.env.VITE_API_URL;

const getHeadersToken = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const signup = async ({ username, password }) => {
  const res = await fetch(`${BASE_URL}/user/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("failed to sign up");
  return await res.json();
};

export const login = async ({ username, password }) => {
  const res = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("failed to login");
  return await res.json();
};

export const raiseUserScore = async (id) => {
  const res = await fetch(`${BASE_URL}/user/score_up/${id}`, {
    method: "PATCH",
    headers: getHeadersToken(),
  });
  if (!res.ok) throw new Error("Failed to update score (frontend api err)");
  return await res.json();
};

export const getUserInfo = async (id) => {
  const res = await fetch(`${BASE_URL}/user/byuserid/${id}`, {
    method: "GET",
    headers: getHeadersToken(),
  });
  if (!res.ok) throw new Error("Failed to get user info");
  return await res.json();
};

export const getTopUsers = async () => {
  const res = await fetch(`${BASE_URL}/user/topusers`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to get top users");
  return await res.json();
};
