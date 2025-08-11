import { api, handleApiError } from "@/src/lib/axios";

export const getAllBuyProperties = async (query?: string) => {
  try {
    const res = await api.get(
      `/properties/get_properties_for_main_site?${query}`
    );
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const getAllBuyPropertiesById = async (id: string) => {
  try {
    const res = await api.get(
      `/properties/get_properties_for_main_site?property_id=${id}`
    );
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
