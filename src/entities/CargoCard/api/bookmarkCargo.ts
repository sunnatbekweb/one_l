import axios from "axios"


export const postToBookmarks = async () => {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/ru/api/v1/`)
}