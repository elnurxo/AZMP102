const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const sliderWrapper = document.querySelector(".slider");

const sliders = [
  {
    title: "1917",
    src: "https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/GtEAAOSw1W9eN1cY/$_57.JPG?set_id=8800005007",
  },
  {
    title: "Jurassic Park",
    src: "https://www.tallengestore.com/cdn/shop/products/Jurassic_Park_-_Tallenge_Hollywood_Movie_Poster_Collection_745d5009-8298-4bf9-9efa-fd77fd18131a.jpg?v=1577693343",
  },
  {
    title: "Interstellar",
    src: "https://m.media-amazon.com/images/I/71ljC3i-8uL._AC_UF894,1000_QL80_.jpg",
  },
  {
    title: "Aladdin",
    src: "https://myhotposters.com/cdn/shop/products/mL3082_1024x1024.jpg?v=1571445679",
  },
  {
    title: "Avatar",
    src: "https://i.ebayimg.com/images/g/JkwAAOSw5atb5FWM/s-l1200.jpg",
  },
];

// Load initial slides
document.addEventListener("DOMContentLoaded", function () {
  sliders.forEach((slider, idx) => {
    sliderWrapper.innerHTML += `
      <div data-active="${idx === 0}" class="slide">
        <img src="${slider.src}" alt="${slider.title}" title="${slider.title}">
      </div>`;
  });
});

const updateSlides = (direction) => {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const currentSlideIdx = slides.findIndex(
    (slide) => slide.getAttribute("data-active") === "true"
  );
  let newSlideIdx;

  if (direction === "next") {
    newSlideIdx = (currentSlideIdx + 1) % slides.length;
  } else if (direction === "prev") {
    newSlideIdx = (currentSlideIdx - 1 + slides.length) % slides.length;
  }

  slides[currentSlideIdx].setAttribute("data-active", "false");
  slides[newSlideIdx].setAttribute("data-active", "true");

  // Adjust slide positions
  slides.forEach((slide) => {
    slide.style.transform = `translateX(-${(newSlideIdx) * 100}%)`;
  });
};

// Next button click
nextBtn.addEventListener("click", function () {
  updateSlides("next");
});

// Previous button click
prevBtn.addEventListener("click", function () {
  updateSlides("prev");
});
