import { FaArrowRightLong } from "react-icons/fa6";
import styles from "./style.module.css";
import type { RouteData } from "../../widgets/CargoWrapper/index";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { setFilters } from "@/features/filters/model/filterSlice";
import { useTranslation } from "react-i18next";

export const RouteCard: React.FC<RouteData> = ({
  origin,
  destination,
  total,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.filters);
  const { t } = useTranslation();

  const onClick = () => {
    dispatch(
      setFilters({
        ...filters,
        origin,
        destination,
      })
    );
    sessionStorage.setItem("viewMode", "search");
  };

  return (
    <div onClick={onClick} className={styles.topSearchCard}>
      <div className={styles.topCardTitle}>
        <div>{origin}</div>
        <FaArrowRightLong className="text-2xl text-gray-300" />
        <div>{destination}</div>
      </div>
      <div className={styles.topCardDesc}>
        <span>{t("total_ads", { total })}</span>
      </div>
    </div>
  );
};
