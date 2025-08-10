import axios from "axios";

export const getCountries = async () => {
	const response = await axios.get(
		`${import.meta.env.VITE_RESTCOUNTRIES_API}/all?fields=name,flags`
	);
	return response.data;
};
