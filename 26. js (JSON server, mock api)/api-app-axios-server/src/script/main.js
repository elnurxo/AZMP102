import { renderSingerCards } from "./helpers/index.js";
import { endpoints } from "./services/API/constants.js";
import { getData } from "./services/API/request.js";
import "@fortawesome/fontawesome-free/css/all.css";
const singersWrapper = document.querySelector(".singers-wrapper");

document.addEventListener("DOMContentLoaded", async function () {
  singersWrapper.innerHTML = `<span class="loader"></span>`;
  const { data, error, loading } = await getData(endpoints.singers);
  if (error) console.log(error);
  if (!loading) {
    singersWrapper.innerHTML = ``;
  }
  if (data) {
    renderSingerCards(data);
  }
});

//search singer
const searchInp = document.querySelector("#search");

searchInp.addEventListener("keyup", async function (e) {
  const { data } = await getData(endpoints.singers);
  if (data) {
    const searchedSingers = data.filter((singer) => {
      if (
        singer.stageName
          .toLowerCase()
          .trim()
          .includes(e.target.value.toLowerCase().trim())
      ) {
        return singer;
      }
    });
    renderSingerCards(searchedSingers);
  }
});

//filter by country
const countrySelectOption = document.querySelector("#nationality");

countrySelectOption.addEventListener("change", async function (e) {
  const { data } = await getData(endpoints.singers);
  const value = e.target.value;
  const filteredSingers = [
    ...data.filter((singer) => singer.nationality === value),
  ];
  if (value === "All") {
    renderSingerCards(data);
  } else {
    renderSingerCards(filteredSingers);
  }
});

//sort singers
const sortSelectOption = document.querySelector("#sort-by-age");

sortSelectOption.addEventListener("change", async function (e) {
  const { data } = await getData(endpoints.singers);
  if (data) {
    const sortedSingers = [
      ...data.sort((singer1, singer2) => {
        if (e.target.value === "from-oldest") {
          return singer2.age - singer1.age;
        } else {
          return singer1.age - singer2.age;
        }
      }),
    ];
    renderSingerCards(sortedSingers);
  }
});
