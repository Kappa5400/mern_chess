export const signup = async ({ username, password }) => {
  const res = await fetch(
    `https://supernatural-crypt-pjpq5pvp6qgq399q7-3000.app.github.dev/api/v1/user/signup`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }
  );
  if (!res.ok) throw new Error("failed to sign up");
  return await res.json();
};

export const login = async ({ username, password }) => {
  const res = await fetch(
    `https://supernatural-crypt-pjpq5pvp6qgq399q7-3000.app.github.dev/api/v1/user/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }
  );
  if (!res.ok) throw new Error("failed to login");
  return await res.json();
};

export const raiseUserScore = async (id) => {
  const res = await fetch(
    `https://supernatural-crypt-pjpq5pvp6qgq399q7-3000.app.github.dev//api/v1/user/score_up/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!res.ok) throw new Error("Failed to update score (frontend api err)");
  return await res.json();
};

export const getUserInfo = async (id) => {
  const res = await fetch(
    `https://supernatural-crypt-pjpq5pvp6qgq399q7-3000.app.github.dev/api/v1/users/${id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  return await res.json();
};
