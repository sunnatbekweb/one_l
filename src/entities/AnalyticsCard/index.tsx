import { FaUsers } from "react-icons/fa";
import styles from "./style.module.css";

export const AnalyticsCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.card_top}>
        <span>1311</span>
        <FaUsers fontSize={35} />
      </div>
      <div>Пользователей</div>
    </div>
  );
};
