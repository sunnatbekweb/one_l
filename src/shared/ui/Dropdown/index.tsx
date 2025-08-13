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
  fromAnywhere?: string;
  anywhere?: string;
}

export const CountriesDropdown = React.forwardRef<
  HTMLInputElement,
  DropdownProps
>(
  (
    {
      icon,
      countries,
      selectedCountry,
      value,
      fromAnywhere,
      anywhere,
      onChange,
      onSelect,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(value);
    const containerRef = useRef<HTMLDivElement>(null);
    const [fromAnywhereValue, setFromAnywhereValue] = useState<
      string | undefined
    >("");
    const [anywhereValue, setAnywhereValue] = useState<string | undefined>("");

    const popularCountries = useMemo(() => {
      const targetNames = [
        "Russia",
        "Uzbekistan",
        "Turkey",
        "Belarus",
        "Kazakhstan",
        "Kyrgyzstan",
        "Tajikistan",
      ];

      return countries
        .filter((c) =>
          targetNames.some(
            (name) => c.name.common.toLowerCase() === name.toLowerCase()
          )
        )
        .sort(
          (a, b) =>
            targetNames.indexOf(
              targetNames.find(
                (name) => name.toLowerCase() === a.name.common.toLowerCase()
              )!
            ) -
            targetNames.indexOf(
              targetNames.find(
                (name) => name.toLowerCase() === b.name.common.toLowerCase()
              )!
            )
        );
    }, [countries]);

    const filteredCountries = useMemo(() => {
      const q = searchTerm.trim().toLowerCase();

      if (q) {
        // При поиске просто фильтруем всё вместе
        return countries
          .filter((c) => c.name.common.toLowerCase().includes(q))
          .sort((a, b) => a.name.common.localeCompare(b.name.common));
      }

      // Когда нет поиска — рендерим популярные отдельно, а остальные по алфавиту
      const restCountries = countries
        .filter((c) => !popularCountries.includes(c))
        .sort((a, b) => a.name.common.localeCompare(b.name.common));

      return { popular: popularCountries, rest: restCountries };
    }, [countries, searchTerm, popularCountries]);

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

        {fromAnywhereValue || anywhereValue ? (
          <input
            value={fromAnywhereValue || anywhereValue}
            className={styles["input"]}
            onFocus={() => {
              setFromAnywhereValue("");
              setAnywhereValue("");
              setSearchTerm("");
              onChange("");
              setIsOpen(true);
            }}
          />
        ) : (
          <input
            ref={ref}
            {...props}
            value={searchTerm}
            className={styles["input"]}
            onFocus={() => {
              setFromAnywhereValue("");
              setAnywhereValue("");
              setSearchTerm("");
              onChange("");
              setIsOpen(true);
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}

        {isOpen && (
          <div className={styles.dropdown}>
            <div
              className={styles["dropdown-content"]}
              onMouseDown={() => {
                if (fromAnywhere) {
                  setFromAnywhereValue(fromAnywhere);
                  setAnywhereValue("");
                } else if (anywhere) {
                  setAnywhereValue(anywhere);
                  setFromAnywhereValue("");
                }
                setIsOpen(false);
              }}
            >
              <span className={styles.name}>{fromAnywhere || anywhere}</span>
            </div>

            {Array.isArray(filteredCountries) ? (
              filteredCountries.map((c) => (
                <div
                  key={c.name.official}
                  className={styles["dropdown-content"]}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setFromAnywhereValue("");
                    setAnywhereValue("");
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
              ))
            ) : (
              <>
                <div className="border-y border-gray-400">
                  {filteredCountries.popular.map((c) => (
                    <div
                      key={c.name.official}
                      className={styles["dropdown-content"]}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setFromAnywhereValue("");
                        setAnywhereValue("");
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
                <div className="border-y border-gray-400">
                  {filteredCountries.rest.map((c) => (
                    <div
                      key={c.name.official}
                      className={styles["dropdown-content"]}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setFromAnywhereValue("");
                        setAnywhereValue("");
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
              </>
            )}
          </div>
        )}
      </div>
    );
  }
);

CountriesDropdown.displayName = "CountriesDropdown";
