import axios from "axios";

export async function getUser<T>(url: string): Promise<T> {
  try {
    const response = await axios.get<T>(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data || error.message || "An error occurred"
      );
    }
    throw new Error("An unexpected error occurred");
  }
}
