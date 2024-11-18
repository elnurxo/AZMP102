// Axios instance customization
const instance = axios.create({
  baseURL: "https://northwind.vercel.app/api/",
  timeout: 10_000,
  headers: { "X-Custom-Header": "code academy" },
});

//interceptors - request, response - BEARER TOKEN (JWT - auth)
//caching responses (axios-cache-adapter), retry mechanism (axios-retry)
//dynamic base url's with .env (prod vs. dev), api rate limiting

//abort request
function newAbortSignal(timeoutMs) {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);

  return abortController.signal;
}

// Utility function for API calls
async function makeRequest(method, endpoint, data = null) {
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

// Exported CRUD functions - Create, Read, Update, Delete
export async function getData(endpoint) {
  return makeRequest("get", endpoint);
}

export async function postData(endpoint, payload) {
  return makeRequest("post", endpoint, payload);
}

export async function putData(endpoint, payload) {
  return makeRequest("put", endpoint, payload);
}

export async function patchData(endpoint, payload) {
  return makeRequest("patch", endpoint, payload);
}

export async function deleteData(endpoint) {
  return makeRequest("delete", endpoint);
}
