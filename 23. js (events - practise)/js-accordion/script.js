const accordionHeaders = Array.from(
  document.querySelectorAll(".accordion-header")
);

accordionHeaders.forEach((header) => {
  header.addEventListener("click", function () {
    const content = this.nextElementSibling;
    const isActive = content.classList.contains("active-accordion");

    // Close all accordions
    accordionHeaders.forEach((accHeader) => {
      accHeader.nextElementSibling.classList.remove("active-accordion");
      accHeader.nextElementSibling.style.height = "0px";
    });

    // Toggle only if it was not active before
    if (!isActive) {
      content.classList.add("active-accordion");
      content.style.height = `${content.scrollHeight}px`;
    }
  });
});
