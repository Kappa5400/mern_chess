import React from "react";
import PropTypes from "prop-types";
import styles from "./sidebar.module.css";
import { Link } from "react-router-dom";

export function SideBar() {
  const menuItems = [
    { name: "Home", url: "/" },
    { name: "Login", url: "/login" },
    { name: "Sign up", url: "/signup" },
    { name: "Puzzle list", url: "/list" },
    { name: "Scoreboard", url: "/score" },
    { name: "Make user puzzle", url: "/makeuserpuzzle" },
    { name: "View own puzzle", url: "/userpuzzlelist" },
    { name: "View all user puzzles", url: "/ViewAllUserPuzzlePage" },
    { name: "About page", url: "/About" },
  ];

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.menuList}>
        {menuItems.map((item) => (
          <li key={item.name} className={styles.menuItem}>
            <Link to={item.url}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

SideBar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
};
