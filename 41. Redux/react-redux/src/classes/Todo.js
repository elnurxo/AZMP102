import { nanoid } from "nanoid";
class Todo {
  constructor(title) {
    this.id = nanoid();
    this.title = title;
    this.completed = false;
    this.createdAt = new Date().toISOString();
  }
}

export default Todo;
