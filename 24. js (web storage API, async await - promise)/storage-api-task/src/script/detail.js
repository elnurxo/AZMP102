import { books } from "./data";

const id = new URLSearchParams(window.location.search).get("id");
const book = books.find((x) => x.id == id);

console.log(book);
