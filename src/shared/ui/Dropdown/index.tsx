import React, { useEffect, useMemo, useRef, useState } from "react";
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
  value: string;
  onChange: (value: string) => void;
  onSelect: (country: Country) => void;
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
    const [searchTerm, setSearchTerm] = useState(value);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setSearchTerm(value);
    }, [value]);

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

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        if (searchTerm !== value) {
          onChange(searchTerm);
        }
      }, 300);
      return () => clearTimeout(timeoutId);
    }, [searchTerm, onChange, value]);

    const filteredCountries = useMemo(() => {
      const q = searchTerm.trim().toLowerCase();
      if (!q) return countries;
      return countries.filter((c) => c.name.common.toLowerCase().includes(q));
    }, [countries, searchTerm]);

    return (
      <div className={styles["dropdown-container"]} ref={containerRef}>
        <div className={styles.icon}>
          {selectedCountry ? (
            <img
              src={selectedCountry.flags.svg}
              alt={selectedCountry.flags.alt}
              style={{ width: 30, height: 20, objectFit: "cover" }}
            />
          ) : (
            icon
          )}
        </div>

        <input
          ref={ref}
          {...props}
          value={searchTerm}
          className={styles["input"]}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {isOpen && (
          <div className={styles.dropdown}>
            {filteredCountries.map((c) => (
              <div
                key={c.name.official}
                className={styles["dropdown-content"]}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setSearchTerm(c.name.common);
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
