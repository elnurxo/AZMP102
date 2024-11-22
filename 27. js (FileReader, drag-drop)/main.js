const characterWrapper = document.querySelector(".character-wrapper");
const form = document.querySelector("form");
const fileUploadInp = document.querySelector("#img");
const titleInp = document.querySelector("#title");

class Character {
  constructor(title, img) {
    this.title = title;
    this.img = img;
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  //file reader
  if (dropZone.style.backgroundImage !== "") {
    const image = JSON.parse(localStorage.getItem("temp-img"));
    localStorage.removeItem("temp-img");
    characterWrapper.innerHTML += `
    <div class="col-3">
               <div class="ard">
                   <img title="${titleInp.value}"
                       src="${image}"
                       class="card-img-top" alt="${titleInp.value}">
                   <div class="card-body">
                       <h5 class="card-title">Character title</h5>
                   </div>
                   <button class="delete btn btn-outline-danger m-3">delete</button>
               </div>
           </div>
 `;
    titleInp.value = "";
    fileUploadInp.value = "";

    //delete buttons
    const deleteBtns = Array.from(document.querySelectorAll(".delete"));
    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (window.confirm("are you sure to delete?")) {
          e.target.closest(".col-3").remove();
        }
      });
    });
  } else {
    const reader = new FileReader();
    const file = fileUploadInp.files[0];
    const sizeKB = (file.size / 1024).toFixed(2);
    //validation
    if (!file.type.startsWith("image/")) {
      window.alert("invalid file format!");
    }
    //size validation - 5 mb
    else if (sizeKB > 5120) {
      window.alert("file size exceeded limit! (2mb)");
    } else {
      //works fine
      reader.readAsDataURL(file);
      reader.addEventListener("load", (e) => {
        const base64Code = e.target.result;
        characterWrapper.innerHTML += `
         <div class="col-3">
                    <div class="ard">
                        <img title="${titleInp.value}"
                            src="${base64Code}"
                            class="card-img-top" alt="${titleInp.value}">
                        <div class="card-body">
                            <h5 class="card-title">Character title</h5>
                        </div>
                        <button class="delete btn btn-outline-danger m-3">delete</button>
                    </div>
                </div>
      `;
        titleInp.value = "";
        fileUploadInp.value = "";

        //delete buttons
        const deleteBtns = Array.from(document.querySelectorAll(".delete"));
        deleteBtns.forEach((btn) => {
          btn.addEventListener("click", (e) => {
            if (window.confirm("are you sure to delete?")) {
              e.target.closest(".col-3").remove();
            }
          });
        });
      });
    }
  }
});

const dropZone = document.querySelector(".drop-zone");

dropZone.addEventListener("dragover", function (e) {
  e.preventDefault();
});
dropZone.addEventListener("drop", function (e) {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener("load", function () {
    const base64Code = reader.result;
    dropZone.style.backgroundImage = `url(${base64Code})`;
    localStorage.setItem("temp-img", JSON.stringify(base64Code));
  });
});
