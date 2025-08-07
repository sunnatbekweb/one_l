import { FaUsers } from "react-icons/fa";
import styles from "./style.module.css";

interface StatisticsProps {
  cargos?: number;
  users?: number;
  text: string;
}

export const StatisticsCard: React.FC<StatisticsProps> = ({
  users,
  cargos,
  text,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.card_top}>
        <span>{(users && users) || (cargos && cargos)}</span>
        <FaUsers fontSize={35} />
      </div>
      <div>{text}</div>
    </div>
  );
};
