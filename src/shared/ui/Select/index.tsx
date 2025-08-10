import React from "react";
import type { CargoType } from "@/shared/types/apiType";
import styles from "./style.module.css";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	icon: React.ReactElement;
	types: CargoType[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
	({ icon, types, ...props }, ref) => {
		return (
			<div className={styles["select-container"]}>
				<div className={styles.icon}>{icon}</div>
				<select
					ref={ref}
					{...props}
					className="pl-8 pr-2 py-2 w-full truncate whitespace-nowrap overflow-hidden text-ellipsis border rounded"
				>
					<option value="">Все типы Груза</option>
					{types.map((t, index) => (
						<option key={index} value={t.type}>
							{t.type}
						</option>
					))}
				</select>
			</div>
		);
	}
);

Select.displayName = "Select";
