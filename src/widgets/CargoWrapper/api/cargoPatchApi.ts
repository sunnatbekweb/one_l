import { baseUrl } from "@/shared/lib/updatedBackendUrl.ts";
import axios from "axios";

export type UpdateData = {
  phoned?: boolean;
  shared?: boolean;
  chatted_telegram?: boolean;
  chatted_whatsup?: boolean;
};

export const patchCargoActions = async (cargoId: number, data: UpdateData) => {
  const fields = Object.entries(data).filter(
    ([_, value]) => value !== undefined
  );

  if (fields.length !== 1) {
    throw new Error("Должен быть только один параметр для обновления");
  }

  const [field, value] = fields[0];

  try {
    const response = await axios.patch(
      `${baseUrl}/cargo/${cargoId}/`,
      { [field]: value },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
