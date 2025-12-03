import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../api/api_user";
import { SideBar } from "../components/sidebar.jsx";
import styles from "./Index.module.css";

export function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signupMutation = useMutation({
    mutationFn: () => signup({ username, password }),
    onSuccess: () => navigate("/login"),
    onError: () => alert("failed to sign up!"),
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    signupMutation.mutate();
  };

  return (
    <div className={styles.container}>
      <SideBar />
      <form onSubmit={handleSubmit}>
        <div className={styles.input}>
          <label htmlFor="create-username">Username: </label>
          <input
            type="text"
            name="create-username"
            id="create-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <br />
        <div className={styles.input}>
          <label htmlFor="create-password">Password: </label>
          <input
            type="password"
            name="create-password"
            id="create-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <input
          className={styles.button}
          type="submit"
          value={signupMutation.isPending ? "Signing up..." : "Sign Up"}
          disabled={!username || !password || signupMutation.isPending}
        />
      </form>
    </div>
  );
}
