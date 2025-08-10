import { useEffect, useState } from "react";
import axios from "axios";

export const useCountryFlag = (countryCode: string) => {
	const [flag, setFlag] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!countryCode) return;

		setLoading(true);
		axios
			.get(
				`${import.meta.env.VITE_RESTCOUNTRIES_API}/alpha/${countryCode}?fields=flags`
			)
			.then(res => {
				setFlag(res.data);
				setError(null);
			})
			.catch(err => {
				console.error(err);
				setError("Не удалось загрузить флаг");
			})
			.finally(() => setLoading(false));
	}, [countryCode]);

	return { flag, loading, error };
};
