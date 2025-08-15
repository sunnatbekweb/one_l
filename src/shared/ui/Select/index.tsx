import React from "react";
import type { CargoType } from "@/shared/types/apiType";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  icon: React.ReactElement;
  car_type: CargoType[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ icon, car_type, ...props }, ref) => {
    const { t } = useTranslation();

    return (
      <div className={styles["select-container"]}>
        <div className={styles.icon}>{icon}</div>
        <select
          ref={ref}
          {...props}
          className={`w-full truncate whitespace-nowrap overflow-hidden text-ellipsis border rounded ${
            props.value === "all" ? "text-[#959595]" : "text-black"
          }`}
        >
          <option value="all" selected disabled>
            {t("cargo_type")}
          </option>
          <option value="">{t("all_cargo_type")}</option>
          {car_type.map((t, index) => (
            <option key={index} value={t.type}>
              {t.car_type}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Select.displayName = "Select";
