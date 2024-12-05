/* eslint-disable react/prop-types */
import styles from "./index.module.css";
import clsx from "clsx";

const Button = ({ variant, text }) => {
  return (
    <button
      className={clsx(
        variant === "primary"
          ? `${styles["btn-primary"]} ${styles.btn}`
          : variant === "success"
          ? `${styles["btn-success"]} ${styles.btn}`
          : variant === "info"
          ? `${styles["btn-info"]} ${styles.btn}`
          : variant === "danger"
          ? `${styles["btn-danger"]} ${styles.btn}`
          : styles.btn
      )}
    >
      {text ? text : "default text"}
    </button>
  );
};

export default Button;
