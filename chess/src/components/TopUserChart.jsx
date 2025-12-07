import React from "react";

export function TopUserChart({ user, score }) {
  return (
    <p>
      <strong>{user}</strong>: {score}
    </p>
  );
}
