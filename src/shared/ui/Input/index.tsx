import type React from "react";
import styles from "./style.module.css";

interface InputProps {
  type: string;
  placeholder: string;
  icon: React.ReactElement;
}

export const InputPrimary: React.FC<InputProps> = ({
  type,
  placeholder,
  icon,
}) => {
  return (
    <div className={styles["input-container"]}>
      <div className={styles.icon}>{icon}</div>
      <input
        type={type}
        placeholder={placeholder}
        className={styles["input-primary"]}
      />
    </div>
  );
};
