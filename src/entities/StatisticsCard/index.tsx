import styles from "./style.module.css";

interface StatisticsProps {
  cargos?: number;
  users?: number;
  text: string;
  icon: React.ReactElement;
}

export const StatisticsCard: React.FC<StatisticsProps> = ({
  users,
  cargos,
  text,
  icon,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.card_top}>
        <span>{(users && users) || (cargos && cargos)}</span>
        {icon}
      </div>
      <div>{text}</div>
    </div>
  );
};
