import React from "react";
import styles from "./style.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactElement;
}

export const InputPrimary = React.forwardRef<HTMLInputElement, InputProps>(
  ({ icon, ...props }, ref) => {
    return (
      <div className={styles["input-container"]}>
        <div className={styles.icon}>{icon}</div>
        <input ref={ref} {...props} className={styles["input-primary"]} />
      </div>
    );
  }
);
