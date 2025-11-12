import React from "react";
import PropTypes from "prop-types";
import styles from "./c_sidebar.module.css";

export function SideBar() {
  const menuItems = [
    "Home",
    "Login",
    "Sign up",
    "Today's Puzzle",
    "Puzzle List",
    "Scoreboard",
    "About",
  ];

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.menuList}>
        {menuItems.map((item, i) => (
          <li key={i} className={styles.menuItem}>
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}

SideBar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
};
