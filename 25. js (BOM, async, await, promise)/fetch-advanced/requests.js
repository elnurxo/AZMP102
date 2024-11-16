//get All
async function getAll(url) {
  let data;
  try {
    const response = await fetch(url);
    if (response.ok) {
      data = await response.json();
      return data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error;
  }
}
//get One (by ID)
async function getOne(url, id) {
  let data;
  try {
    const response = await fetch(url + `/${id}`);
    if (response.ok) {
      data = await response.json();
      return data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error;
  }
}

//delete
async function deleteOne(url, id) {
  let data;
  try {
    const response = await fetch(url + `/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      data = await response.json();
      return data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error;
  }
}

//post
async function post(url, payload) {
  let data;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      data = await response.json();
      return data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error;
  }
}

//put
async function put(url, id, payload) {
  let data;
  try {
    const response = await fetch(url + `/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      data = await response.json();
      return data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error;
  }
}

//patch
async function patch(url, id, payload) {
  let data;
  try {
    const response = await fetch(url + `/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      data = await response.json();
      return data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error;
  }
}

const request_controller = {
  getAll: getAll,
  getOne: getOne,
  deleteOne: deleteOne,
  post: post,
  put: put,
  patch,
};

export default request_controller;
