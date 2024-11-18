import { makeRequest } from "./utility.js";

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

//interceptors - request, response - BEARER TOKEN (JWT - auth)
//caching responses (axios-cache-adapter), retry mechanism (axios-retry)
//dynamic base url's with .env (prod vs. dev), api rate limiting
