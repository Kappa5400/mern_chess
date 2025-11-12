import React from "react";
import PropTypes from "prop-types";
import styles from "./profile.module.css";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/AuthContext.jsx";

export function Profile({ name }) {
  const [token, setToken] = useAuth();

  if (token) {
    console.log("Raw token string:", token);
    console.log("Decoded payload:", jwtDecode(token));
    const { sub } = jwtDecode(token);
    return (
      <div>
        Logged in as <User id={sub} />
        <br />
        <button onClick={() => setToken(null)}>Logout</button>
      </div>
    );
  }

  return (
    <div className={styles.profile}>
      <span className={styles.name}>{name}</span>
    </div>
  );
}

Profile.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
};
