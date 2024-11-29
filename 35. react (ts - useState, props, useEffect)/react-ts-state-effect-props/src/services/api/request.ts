import axios from "axios";

type API_RESPONSE<T> = {
  data: T;
  message: string;
};

export async function getAll<T>(
  url: string,
  name?: string,
): Promise<API_RESPONSE<T>> {
  const FINAL_URL = name ? `${url}?name=${encodeURIComponent(name)}` : url;

  try {
    const { data } = await axios.get<T>(FINAL_URL);
    return {
      message: "Data retrieved successfully!",
      data,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      message: "An error occurred while fetching data.",
      data: [] as unknown as T, // Handle empty or fallback data type
    };
  }
}


