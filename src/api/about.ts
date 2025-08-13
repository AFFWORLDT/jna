import axios from "axios";
import { TOKEN } from "../utils/config";

export const getFounderData = async () => {
  const token = TOKEN;
  try {
    const response = await axios.get("https://jna-api.propfusion.io/agent/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
