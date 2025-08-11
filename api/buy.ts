import { api, handleApiError } from "@/src/lib/axios";

export const getAllBuyProperties = async (query?: string) => {
  try {
    const res = await api.get(`/properties/get_properties_for_main_site?${query}`);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}