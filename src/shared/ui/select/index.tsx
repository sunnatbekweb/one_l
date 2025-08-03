import styles from "./style.module.css";

interface SelectProps {
  name: string;
  id: string;
  defaultValue?: string;
  icon: React.ReactElement;
}

export const Select: React.FC<SelectProps> = ({
  name,
  id,
  defaultValue,
  icon,
}) => {
  return (
    <div className={styles["select-container"]}>
      <div className={styles.icon}>{icon}</div>
      <select name={name} id={id}>
        <option value="0">{defaultValue}</option>
        <option value="1">Рефрежиратор</option>
      </select>
    </div>
  );
};
