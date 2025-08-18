import React from "react";
import type { CargoType } from "@/shared/types/apiType";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  icon: React.ReactElement;
  car_type: CargoType[];
}

export const types = [
  {
    value: "Тент",
  },
  {
    value: "Реф",
  },
  {
    value: "Паравоз",
  },
];

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ icon, car_type, ...props }, ref) => {
    const { t } = useTranslation();

    return (
      <div className={styles["select-container"]}>
        <div className={styles.icon}>{icon}</div>
        <select
          ref={ref}
          {...props}
          defaultValue={"all"}
          className={`w-full truncate whitespace-nowrap overflow-hidden text-ellipsis border rounded ${
            props.value === "all" ? "text-[#959595]" : "text-black"
          }`}
        >
          <option value="all" disabled>
            {t("cargo_type")}
          </option>
          <option value="">{t("all_cargo_type")}</option>
          {types
            .filter((t) => t.value !== null)
            .map((t, index) => (
              <option key={index} value={t.value}>
                {t.value}
              </option>
            ))}
        </select>
      </div>
    );
  }
);

Select.displayName = "Select";
