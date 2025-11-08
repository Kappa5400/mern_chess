import React from "react";
import PropTypes from "prop-types";
import styles from "./c_sidebar.module.css";

export function SideBar({ items = [] }) {
  return (
    <aside className={styles.sidebar}>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={index} className={styles.item}>
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
