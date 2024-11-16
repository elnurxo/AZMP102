import { API_BASE_URL, endpoints } from "./constants.js";

const list = document.querySelector("#list");
const post = document.querySelector("#post");
const deleteBtn = document.querySelector("#delete");
const patch = document.querySelector("#patch");
const put = document.querySelector("#put");

//API -Application Programming Interface - request-response (client-server)
//JSON format - client - server
//HTTP-HTTPS (secure) - Hyper Text Transform Protocol
//HTTP status codes - 5
//HTTP METHODS - GET (default), POST, PUT, PATCH, DELETE

//GET (get all, get by id, get by params (queries))
//POST - create new data (payload)
//DELETE (id) - delete data from API
//PUT, PATCH (id, payload) - update API data

//(100 - informational, 200 - successful, 300 - redirect, 400 - client, 500 -server)
//200 (ok), 201, 203, 204, 404, 403, 500

//FETCH API - fetch
// const result = fetch("https://northwind.vercel.app/api/categories");

// const response = result.then((res) => res.json());

// const data = response.then((data) => {
//   console.log(data);
//   return data;
// });

// console.log("outside: ", data);

//fetch - GET ALL
fetch(API_BASE_URL + endpoints.categories, {
  method: "GET",
  //payload - body
  //headers
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response);
    }
  })
  .then((categories) => {
    categories.forEach((category) => {
      list.innerHTML += `<li data-id="${category.id}">
      <a href="detail.html?id=${category.id}">${category?.name}</a>
      </li>`;
    });
  })
  .catch((err) => {
    console.log(err);
  });

deleteBtn.addEventListener("click", () => {
  fetch(API_BASE_URL + endpoints.categories + `/3`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("response from delete request: ", data);
      //   window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
});

post.addEventListener("click", function () {
  fetch(API_BASE_URL + endpoints.categories, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    //payload
    body: JSON.stringify({ name: "azmiu", description: "lorem ipsum" }),
  });
});

//patch
patch.addEventListener("click", function () {
  fetch(API_BASE_URL + endpoints.categories + "/24", {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: "AZMIU UPDATED PATCH!" }),
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log(data);
    });
});

//put
put.addEventListener("click", function () {
  fetch(API_BASE_URL + endpoints.categories + "/24", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: "AZMIU UPDATED PATCH!" }),
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log(data);
    });
});
