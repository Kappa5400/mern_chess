import React from "react";
import PropTypes from "prop-types";
import styles from "./profile.module.css";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/AuthContext.jsx";
import { User } from "./user.jsx";

export function Profile({ name }) {
  const [token, setToken] = useAuth();

  if (token) {
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
  name: PropTypes.string.isRequired,
};
