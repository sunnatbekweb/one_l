import React from "react";
import styles from "./style.module.css";
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  icon: React.ReactElement;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ icon, children, ...props }, ref) => {
    return (
      <div className={styles["select-container"]}>
        <div className={styles.icon}>{icon}</div>
        <select ref={ref} {...props} className="pl-8 pr-2 py-2 border rounded">
          <option value="">Все типы Груза</option>
          <option value="1">Реф</option>
          <option value="2">Тент</option>
        </select>
      </div>
    );
  }
);

Select.displayName = "Select";
