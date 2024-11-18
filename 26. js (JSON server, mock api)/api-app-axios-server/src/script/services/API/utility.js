import instance from "./instance.js";

//abort request
export function newAbortSignal(timeoutMs) {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);

  return abortController.signal;
}

// Utility function for API calls
export async function makeRequest(method, endpoint, data = null) {
  const state = {
    loading: true,
    error: null,
    data: null,
  };

  try {
    const response = await instance({
      method,
      url: endpoint,
      data,
      //signal: newAbortSignal(6000),
    });
    state.data = response.data;
  } catch (err) {
    state.error = err.response
      ? {
          status: err.response.status,
          statusText: err.response.statusText,
          data: err.response.data,
        }
      : { message: err.message };
  } finally {
    state.loading = false;
  }

  return state;
}
