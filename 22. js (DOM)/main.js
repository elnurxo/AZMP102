// console.log(document);

// const h2 = document.getElementById("text");
// console.log(document.getElementsByName("fName"));
// console.log(document.getElementsByTagName("li"));
// console.log(document.getElementsByClassName("paragraph"));
// const paragraphs = document.getElementsByClassName("paragraph");
// const title = document.querySelectorAll("ul#list>li");
// const listItem = document.querySelector("li");

// const listItem = document.querySelector("li");

// console.log(listItem.closest("body"));

// const list = document.querySelector("#list");

// for (let i = 0; i < list.children.length; i++) {
//     const element = list.children[i];
//     console.log(element);
// }

// console.log(list.previousElementSibling);

//------------------------------------------------------

const p = document.createElement("p");
p.classList.add("text");
p.textContent = "lorem ipsum";
const p2 = document.createElement("p");
p2.classList.add("text");
p2.textContent = "lorem ipsum dolor.";

// document.body.prependChild(p, p2);

// document.querySelector(".box").before(p);

const list = document.querySelector("#list");

// list.removeChild(list.firstElementChild);

{
  /* <p></p> */
}

//innerHTML, innerText, textContent
// p.innerHTML = "<span>text</span>";
// p.innerText = "salam 2";
// p.textContent = "salam 3";

// p.classList.add("text", "test");
// p.classList.remove("text");
// console.log(p.classList.contains("test"));
// p.classList.replace("test", "sentence");

// console.log(p);

const link = document.querySelector("a");

link.classList.add("link");

// link.style.color = "red";
// link.style.border = "1px solid black";
// link.style.backgroundColor = "blue";
// link.style.fontSize = "24px";

// link.textContent = "youtube";

// // console.log(link.getAttribute("src"));
// // console.log(link.hasAttribute("src"));

// link.setAttribute("href", "https://youtube.com");
// link.setAttribute("target","_blank");

// link.removeAttribute("target");
