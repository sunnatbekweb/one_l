import React, { useEffect, useRef, useState } from "react";
import type { Country } from "@/shared/types/apiType.ts";
import styles from "./style.module.css";

interface DropdownProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"onSelect" | "onChange" | "value"
	> {
	icon: React.ReactElement;
	countries: Country[];
	selectedCountry: Country | null;
	value: string; // текущее значение поля (от родителя)
	onChange: (value: string) => void; // меняем текст
	onSelect: (country: Country) => void; // выбираем страну
}

export const CountriesDropdown = React.forwardRef<
	HTMLInputElement,
	DropdownProps
>(
	(
		{ icon, countries, selectedCountry, value, onChange, onSelect, ...props },
		ref
	) => {
		const [isOpen, setIsOpen] = useState(false);
		const containerRef = useRef<HTMLDivElement>(null);

		// Закрытие при клике вне
		useEffect(() => {
			const handleClickOutside = (event: MouseEvent) => {
				if (
					containerRef.current &&
					!containerRef.current.contains(event.target as Node)
				) {
					setIsOpen(false);
				}
			};
			document.addEventListener("mousedown", handleClickOutside);
			return () =>
				document.removeEventListener("mousedown", handleClickOutside);
		}, []);

		// Фильтруем страны по введённому значению
		const filteredCountries = countries.filter(c =>
			c.name.common.toLowerCase().includes(value.toLowerCase())
		);

		return (
			<div className={styles["dropdown-container"]} ref={containerRef}>
				<div className={styles.icon}>
					{selectedCountry ? (
						<img
							src={selectedCountry.flags.svg}
							alt={selectedCountry.flags.alt}
							style={{ width: 40, height: 20, objectFit: "cover" }}
						/>
					) : (
						icon
					)}
				</div>

				<input
					ref={ref}
					{...props}
					value={value}
					className={styles["input"]}
					onFocus={() => setIsOpen(true)}
					onChange={e => onChange(e.target.value)}
				/>

				{isOpen && (
					<div className={styles.dropdown}>
						{filteredCountries.map(c => (
							<div
								key={c.name.official}
								className={styles["dropdown-content"]}
								onMouseDown={e => {
									e.preventDefault();
									onSelect(c);
									setIsOpen(false);
								}}
							>
								<div className={styles["image-container"]}>
									<img src={c.flags.svg} alt={c.flags.alt} />
								</div>
								<span className={styles.name}>{c.name.common}</span>
							</div>
						))}
					</div>
				)}
			</div>
		);
	}
);

CountriesDropdown.displayName = "CountriesDropdown";
