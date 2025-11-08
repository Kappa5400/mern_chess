import React from "react"
import PropTypes from "prop-types";
import styles from "./c_profile.module.css"

export function Profile({ name, avatar_url }){
    return (
    <div className={styles.profile}>
      <img src={avatar_url} alt={`${name} avatar`} className={styles.avatar} />
      <span className={styles.name}>{name}</span>
    </div>
  );
}


Profile.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
};
