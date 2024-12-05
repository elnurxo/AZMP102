import { nanoid } from "nanoid";

class Category {
  constructor(name) {
    this.id = nanoid();
    this.name = name;
  }
}

export default Category;
